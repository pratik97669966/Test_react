// AllData.refactor.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { FilterList, PictureAsPdf, Print, Search, Share, WhatsApp } from '@material-ui/icons';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import useStyles from './AllDataStyles';
import { generateInvoicePDF } from './invoiceUtils';

export interface BillData {
  id: number;
  address?: string;
  branch?: string;
  comboPack?: string;
  dateOfBirth?: string;
  firstName?: string;
  note?: string;
  fromWho?: string;
  paidAmount: number;
  paymentMode?: string;
  pendingAmount: number;
  phone?: string;
  price: number;
  comboPrice?: number;
  deliveryCharges?: number;
  qty?: number;
  status?: string;
  deliveryDate?: string;
  deliveryStatus?: string;
}

const api = axios.create({
  baseURL: 'https://gunjalpatilserver.onrender.com',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

function normalizeStatus(s?: string) {
  if (!s) return '';
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Map of normalized statuses we care about to a canonical label */
const STATUS_CANON = {
  paid: 'Paid',
  partial: 'Partial',
  unpaid: 'Unpaid',
  'deliverd': 'Delivered', // accept misspelling 'Deliverd' but canonicalize to 'Delivered'
  delivered: 'Delivered',
  pending: 'Pending',
  cancelled: 'Cancelled',
  'out for delivery': 'Out for Delivery',
};

const AllData: React.FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState<BillData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // dialog state
  const [selectedItem, setSelectedItem] = useState<BillData | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<string>('');
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  // confirm full payment
  const [confirmFullPayFor, setConfirmFullPayFor] = useState<BillData | null>(null);

  // fetch with cancellation
  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    (async function fetchData() {
      try {
        setLoading(true);
        const resp = await api.get('/data', { signal: controller.signal as unknown as any });
        const respData = Array.isArray(resp.data) ? resp.data.slice(2) : [];
        if (!mounted) return;
        setData(respData);
      } catch (err: any) {
        if (axios.isCancel(err)) return;
        enqueueSnackbar('Failed to fetch data', { variant: 'error' });
        console.error('fetchData error', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // derived: normalized status per item (memoized)
  const dataWithNormalStatus = useMemo(() => {
    return data.map((d) => {
      const dsNorm = normalizeStatus(d.deliveryStatus);
      const canonicalDelivery = STATUS_CANON[dsNorm as keyof typeof STATUS_CANON] ?? d.deliveryStatus ?? '';
      return { ...d, _deliveryCanonical: canonicalDelivery };
    });
  }, [data]);

  // status counts (useMemo)
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: data.length,
      Paid: 0,
      Partial: 0,
      Unpaid: 0,
      Delivered: 0,
      Pending: 0,
      Cancelled: 0,
      'Out for Delivery': 0,
    };

    data.forEach((item) => {
      // payment based
      if (Number(item.pendingAmount) === 0) counts.Paid++;
      else if (Number(item.paidAmount) > 0 && Number(item.pendingAmount) > 0) counts.Partial++;
      else if (Number(item.paidAmount) === 0) counts.Unpaid++;

      // delivery-based (use canonical)
      const ds = STATUS_CANON[normalizeStatus(item.deliveryStatus) as keyof typeof STATUS_CANON] ?? item.deliveryStatus;
      if (!ds) return;
      if (ds === 'Delivered') counts.Delivered++;
      else if (ds === 'Pending') counts.Pending++;
      else if (ds === 'Cancelled') counts.Cancelled++;
      else if (ds === 'Out for Delivery') counts['Out for Delivery']++;
    });

    counts.All = data.length;
    return counts;
  }, [data]);

  // debounced search state (simple, 250ms)
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 250);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // filtered data memoized
  const filteredData = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return dataWithNormalStatus.filter((item) => {
      const phone = String(item.phone ?? '');
      const firstName = (item.firstName ?? '').toLowerCase();
      const id = String(item.id ?? '');
      const matchesSearch = !term || phone.includes(term) || firstName.includes(term) || id.includes(term);

      // status check
      if (statusFilter === 'All' || !statusFilter) return matchesSearch;

      if (statusFilter === 'Paid') return Number(item.pendingAmount) === 0;
      if (statusFilter === 'Partial') return Number(item.pendingAmount) > 0 && Number(item.paidAmount) > 0;
      if (statusFilter === 'Unpaid') return Number(item.paidAmount) === 0;
      if (statusFilter === 'Delivered') return normalizeStatus(item.deliveryStatus) === 'deliverd' || normalizeStatus(item.deliveryStatus) === 'delivered';
      if (statusFilter === 'Pending') return normalizeStatus(item.deliveryStatus) === 'pending';
      if (statusFilter === 'Cancelled') return normalizeStatus(item.deliveryStatus) === 'cancelled';
      if (statusFilter === 'Out for Delivery') return normalizeStatus(item.deliveryStatus) === 'out for delivery';
      return matchesSearch;
    });
  }, [dataWithNormalStatus, debouncedSearch, statusFilter]);

  // totals memoized
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        acc.totalBookings += 1;
        acc.totalAmount += Number(item.price) || 0;
        acc.paidAmount += Number(item.paidAmount) || 0;
        acc.pendingAmount += Number(item.pendingAmount) || 0;
        return acc;
      },
      { totalBookings: 0, totalAmount: 0, paidAmount: 0, pendingAmount: 0 },
    );
  }, [filteredData]);

  // open/close dialog
  const openDetails = useCallback((item: BillData) => {
    setSelectedItem(item);
    setDeliveryStatus(item.deliveryStatus ?? '');
  }, []);

  // format currency
  const fmt = useCallback((v: number) => currencyFormatter.format(v || 0), []);

  // helper: safe API request wrapper
  const safePostUpdate = useCallback(async (updatedItem: any) => {
    setApiLoading(true);
    try {
      const resp = await api.post('/data/', updatedItem);
      if (resp.status >= 200 && resp.status < 300) {
        // replace local item
        setData((prev) => prev.map((p) => (p.id === updatedItem.id ? { ...p, ...updatedItem } : p)));
        return true;
      }
      enqueueSnackbar('Server returned unexpected status', { variant: 'warning' });
      return false;
    } catch (err: any) {
      enqueueSnackbar(err?.response?.data?.message ?? 'Failed to update', { variant: 'error' });
      console.error('update error', err);
      return false;
    } finally {
      setApiLoading(false);
    }
  }, [enqueueSnackbar]);

  // mark full payment (with confirm)
  const confirmFullPayment = useCallback((item: BillData) => {
    setConfirmFullPayFor(item);
  }, []);

  const handleDoFullPayment = useCallback(async () => {
    if (!confirmFullPayFor) return;
    const item = confirmFullPayFor;
    const updatedItem = {
      ...item,
      apiRequestFor: 'update',
      paidAmount: Number(item.price) || 0,
      pendingAmount: 0,
      status: 'Paid',
    };
    const ok = await safePostUpdate(updatedItem);
    if (ok) {
      enqueueSnackbar('Payment marked as FULL RECEIVED', { variant: 'success' });
      setSelectedItem(updatedItem);
    }
    setConfirmFullPayFor(null);
  }, [confirmFullPayFor, safePostUpdate, enqueueSnackbar]);

  // delivery update
  const handleDeliveryUpdate = useCallback(async (item: BillData, newStatus: string) => {
    const updatedItem = { ...item, apiRequestFor: 'update', deliveryStatus: newStatus };
    const ok = await safePostUpdate(updatedItem);
    if (ok) {
      setSelectedItem(updatedItem);
      enqueueSnackbar('Delivery status updated!', { variant: 'success' });
    }
  }, [safePostUpdate, enqueueSnackbar]);

  // helpers for PDF / share
  const handlePrint = useCallback((item: BillData) => {
    try {
      const pdf = generateInvoicePDF(item);
      pdf.autoPrint?.();
      pdf.output('dataurlnewwindow');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to generate PDF', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  const createPdfBlob = useCallback((item: BillData) => {
    try {
      const pdf = generateInvoicePDF(item);
      const blob = pdf.output('blob');
      return blob;
    } catch (err) {
      console.error('pdf blob error', err);
      return null;
    }
  }, []);

  const shareOrOpen = useCallback(async (item: BillData) => {
    const blob = createPdfBlob(item);
    if (!blob) {
      enqueueSnackbar('Failed to prepare invoice', { variant: 'error' });
      return;
    }
    const file = new File([blob], `invoice_${item.id}.pdf`, { type: 'application/pdf' });
    try {
      if ((navigator as any).canShare && (navigator as any).canShare({ files: [file] })) {
        await (navigator as any).share({ title: 'Invoice', text: `Invoice for ${item.firstName}`, files: [file] });
      } else {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      }
    } catch (err) {
      console.warn('share fallback', err);
    }
  }, [createPdfBlob, enqueueSnackbar]);

  const shareWhatsapp = useCallback((item: BillData) => {
    if (!item) return;

    const raw = String(item.phone ?? '').replace(/\D/g, '');
    if (!raw) {
      enqueueSnackbar('Invalid phone number', { variant: 'warning' });
      return;
    }
    const phoneWithCode = raw.length <= 10 ? `91${raw}` : raw;

    const formattedDateOfBirth = item.dateOfBirth
      ? new Date(item.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : '';
    const formattedDeliveryDate = item.deliveryDate
      ? new Date(item.deliveryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : '';

    const delivery = item.deliveryCharges ? Number(item.deliveryCharges) : 0;
    const price = Number(item.price ?? 0);
    const paid = Number(item.paidAmount ?? 0);
    const pending = Number(item.pendingAmount ?? 0);

    const message = `
*गुंजाळ पाटील भेळ व मिसळ*

पत्ता:
58/2, गुंजाळ पाटील कॉर्नर,
जाखुरी, ता. संगमनेर, जि. अहिल्यानगर. 422605
संपर्क क्रमांक: 
8888147262 , 9923469913

*प्रिय सर/मॅडम*,
आपल्या दिवाळी फराळ बुकिंगबद्दल धन्यवाद! 🙏 
कृपया आपल्या ऑर्डरचे बिल तपासा:

${formattedDateOfBirth ? 'तारीख: ' + formattedDateOfBirth : ''}
बिल क्रमांक: ${item.id}
*ग्राहकाचे नाव: ${item.firstName}*
संपर्क क्रमांक: ${item.phone}

ऑर्डर तपशील:

${item.comboPack} Combo Pack
नग: ${item.qty}
किंमत: ₹${item.comboPrice?.toFixed(2) ?? '0'}
${delivery > 0 ? 'डिलिव्हरी चार्जेस: ₹' + delivery.toFixed(2) : ''}

*एकूण रक्कम: ₹${(price + delivery).toFixed(2)}*

जमा रक्कम: ₹${paid.toFixed(2)}

*शिल्लक रक्कम: ₹${pending.toFixed(2)}*

अभिनंदन ${item.firstName} आपल्या दिवाळीच्या फराळाची बुकिंग झालेली आहे.
${formattedDeliveryDate ? 'आपला कोम्बो पॅक घेण्याची अंदाजे तारीख: ' + formattedDeliveryDate : ''}

आमच्या सेवांचा लाभ घेतल्याबद्दल धन्यवाद..! 🙏 

🪔🪔🪔 आपणास आणि आपल्या संपूर्ण परिवाराला दिवाळीच्या खूप खूप शुभेच्छा! 🪔🪔🪔

आदरपूर्वक,
*गुंजाळ पाटील भेळ व मिसळ*

अधिक माहितीसाठी:
WhatsApp ग्रुप: https://chat.whatsapp.com/L52wkjvPjkMCNhGldT9Fdb
Instagram: https://www.instagram.com/gunjal_patil_bhel_and_misal/profilecard/?igsh=YzE3a2hqcGh4OW40
`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=+${phoneWithCode}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [enqueueSnackbar]);

  // UI
  return (
    <div style={{ background: '#fff' }}>
      <Backdrop open={apiLoading} style={{ zIndex: 2000, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Status chips */}
      <Grid container spacing={1} style={{ padding: '8px 16px', borderBottom: '1px solid #eee', marginBottom: 8 }}>
        {Object.entries(statusCounts).map(([status, count]) => (
          <Grid item key={status}>
            <Chip
              label={`${status} (${count})`}
              clickable
              color={statusFilter === status ? 'primary' : 'default'}
              onClick={() => setStatusFilter(status)}
              aria-pressed={statusFilter === status}
            />
          </Grid>
        ))}
      </Grid>

      {/* Summary */}
      <Grid container spacing={2} style={{ padding: '0 16px 16px', borderBottom: '1px solid #eee' }}>
        <Grid item xs={6} md={3}><Typography variant="body2">Total Bookings: <b>{totals.totalBookings}</b></Typography></Grid>
        <Grid item xs={6} md={3}><Typography variant="body2">Total Amount: <b>{fmt(totals.totalAmount)}</b></Typography></Grid>
        <Grid item xs={6} md={3}><Typography variant="body2" style={{ color: 'green' }}>Paid: <b>{fmt(totals.paidAmount)}</b></Typography></Grid>
        <Grid item xs={6} md={3}><Typography variant="body2" style={{ color: 'red' }}>Pending: <b>{fmt(totals.pendingAmount)}</b></Typography></Grid>
      </Grid>

      {/* Search */}
      <Grid container spacing={2} style={{ padding: '16px' }}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            placeholder="Search by name, phone or id"
            fullWidth
            margin="dense"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="open filters"><FilterList /></IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{ 'aria-label': 'search transactions' }}
          />
        </Grid>
      </Grid>

      {/* Transactions */}
      <Grid container spacing={2} style={{ padding: '0 16px 16px' }}>
        {loading ? (
          <Typography variant="h6" align="center" style={{ width: '100%' }}>Loading...</Typography>
        ) : filteredData.length === 0 ? (
          <Typography variant="body1" align="center" style={{ width: '100%' }}>No records found</Typography>
        ) : (
          <Grid container spacing={2} style={{ padding: '0 16px' }}>
            {filteredData.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Card style={{ cursor: 'pointer' }} onClick={() => openDetails(item)}>
                  <CardContent>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" style={{ fontWeight: 600 }}>{item.firstName}</Typography>
                      {/* status chip */}
                      <Chip
                        label={
                          Number(item.pendingAmount) === 0 ? 'SALE : PAID' :
                            Number(item.paidAmount) > 0 ? 'SALE : PARTIAL' : 'SALE : UNPAID'
                        }
                        style={{ backgroundColor: Number(item.pendingAmount) === 0 ? '#4caf50' : Number(item.paidAmount) > 0 ? '#03a9f4' : '#ff9800', color: '#fff' }}
                      />
                    </Grid>

                    <Grid container spacing={1} style={{ marginTop: 8 }}>
                      <Grid item xs={6}><Typography variant="body2">Total: {fmt(item.price)}</Typography></Grid>
                      <Grid item xs={6}><Typography variant="body2" style={{ color: item.pendingAmount === 0 ? 'green' : 'inherit', fontWeight: item.pendingAmount === 0 ? 600 : 400 }}>Paid: {fmt(item.paidAmount)}</Typography></Grid>
                      <Grid item xs={6}><Typography variant="body2">Balance: {fmt(item.pendingAmount)}</Typography></Grid>
                      <Grid item xs={6}><Typography variant="body2">Delivery: {item.deliveryStatus ?? '-'}</Typography></Grid>
                    </Grid>

                    <Grid container justifyContent="flex-end" spacing={1} style={{ marginTop: 4 }} onClick={(e) => e.stopPropagation()}>
                      <Grid item>
                        <Tooltip title="Print">
                          <IconButton aria-label="print" onClick={() => handlePrint(item)}><Print /></IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Share or open PDF">
                          <IconButton aria-label="share" onClick={() => shareOrOpen(item)}><Share /></IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Download PDF">
                          <IconButton aria-label="download pdf" onClick={() => {
                            const pdf = generateInvoicePDF(item);
                            pdf.save?.(`invoice_${item.id}.pdf`);
                          }}><PictureAsPdf /></IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Send on WhatsApp">
                          <IconButton aria-label="whatsapp" onClick={() => shareWhatsapp(item)}><WhatsApp style={{ color: 'green' }} /></IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      {/* Details dialog */}
      <Dialog open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)} fullWidth maxWidth="sm">
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent dividers>
          {selectedItem && (
            <>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" gutterBottom>Customer: {selectedItem.firstName}</Typography>
                <Chip label={selectedItem.status ?? '-'} />
              </Grid>

              <Typography variant="body2">Phone: {selectedItem.phone ?? '-'}</Typography>
              <Typography variant="body2">Address: {selectedItem.address ?? '-'}</Typography>
              <Typography variant="body2">Product: {selectedItem.comboPack ?? '-'}</Typography>
              <Typography variant="body2">Qty: {selectedItem.qty ?? '-'}</Typography>
              <Typography variant="body2">Total: {fmt(selectedItem.price)}</Typography>
              <Typography variant="body2">Paid: {fmt(selectedItem.paidAmount)}</Typography>
              <Typography variant="body2">Pending: {fmt(selectedItem.pendingAmount)}</Typography>
              <Typography variant="body2">Payment Mode: {selectedItem.paymentMode ?? '-'}</Typography>
              <Typography variant="body2">Delivery Date: {selectedItem.deliveryDate ? new Date(selectedItem.deliveryDate).toLocaleDateString('en-GB') : '-'}</Typography>

              <FormControl fullWidth style={{ marginTop: 16 }}>
                <InputLabel>Delivery Status</InputLabel>
                <Select value={deliveryStatus} onChange={(e) => setDeliveryStatus(e.target.value as string)}>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                  <MenuItem value="Deliverd">Deliverd</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {selectedItem && selectedItem.pendingAmount > 0 && (
            <Button color="secondary" variant="contained" onClick={() => confirmFullPayment(selectedItem)}>Payment Full Receive</Button>
          )}
          <Button onClick={() => setSelectedItem(null)}>Close</Button>
          <Button color="primary" variant="contained" onClick={async () => {
            if (selectedItem) {
              await handleDeliveryUpdate(selectedItem, deliveryStatus);
            }
            setSelectedItem(null);
          }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Full Payment dialog */}
      <Dialog open={Boolean(confirmFullPayFor)} onClose={() => setConfirmFullPayFor(null)}>
        <DialogTitle>Confirm Full Payment</DialogTitle>
        <DialogContent>
          <Typography>Mark payment as fully received for <b>{confirmFullPayFor?.firstName}</b> (ID: {confirmFullPayFor?.id})?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmFullPayFor(null)}>Cancel</Button>
          <Button color="secondary" variant="contained" onClick={handleDoFullPayment}>Yes, mark Paid</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllData;
