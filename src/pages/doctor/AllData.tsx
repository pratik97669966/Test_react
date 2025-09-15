import { useEffect, useState } from "react";
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
  Typography,
} from "@material-ui/core";
import {
  FilterList,
  PictureAsPdf,
  Print,
  Search,
  Share,
  WhatsApp,
} from "@material-ui/icons";
import axios from "axios";
import { useSnackbar } from "notistack";

import useStyles from "./AllDataStyles";
import { generateInvoicePDF } from "./invoiceUtils";

export interface BillData {
  id: number;
  address: string;
  branch: string;
  comboPack: string;
  dateOfBirth: string;
  firstName: string;
  note: string;
  fromWho: string;
  paidAmount: number;
  paymentMode: string;
  pendingAmount: number;
  phone: string;
  price: number;
  comboPrice: number;
  qty: number;
  status: string;
  deliveryDate: string;
  deliveryStatus: string;
  deliveryCharges: string;
}

const AllData = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<BillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Dialog state
  const [selectedItem, setSelectedItem] = useState<BillData | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [apiLoading, setApiLoading] = useState(false);

  // 🔹 Status filter
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://gunjalpatilserver.onrender.com/data"
      );
      const cleanedData = response.data.slice(2);
      setData(cleanedData);
    } catch (error) {
      enqueueSnackbar("Failed to fetch data", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Status counts for chips
  const getStatusCounts = () => {
    const counts: Record<string, number> = {
      All: data.length,
      Paid: 0,
      Partial: 0,
      Unpaid: 0,
      Delivered: 0,
      Pending: 0,
      Cancelled: 0,
    };

    data.forEach((item) => {
      if (item.pendingAmount === 0) counts.Paid++;
      else if (item.paidAmount > 0 && item.pendingAmount > 0) counts.Partial++;
      else if (item.paidAmount === 0) counts.Unpaid++;

      if (item.deliveryStatus === "Deliverd") counts.Delivered++;
      if (item.deliveryStatus === "Pending") counts.Pending++;
      if (item.deliveryStatus === "Cancelled") counts.Cancelled++;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  // 🔹 Filtered Data
  const filteredData = data.filter((item) => {
    const { phone, firstName, id } = item;
    const matchesSearch =
      String(phone).includes(searchTerm) ||
      (firstName &&
        firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      String(id).includes(searchTerm);

    let matchesStatus = true;
    if (statusFilter === "Paid") {
      matchesStatus = item.pendingAmount === 0;
    } else if (statusFilter === "Partial") {
      matchesStatus = item.pendingAmount > 0 && item.paidAmount > 0;
    } else if (statusFilter === "Unpaid") {
      matchesStatus = item.paidAmount === 0;
    } else if (statusFilter === "Delivered") {
      matchesStatus = item.deliveryStatus === "Deliverd";
    } else if (statusFilter === "Pending") {
      matchesStatus = item.deliveryStatus === "Pending";
    } else if (statusFilter === "Cancelled") {
      matchesStatus = item.deliveryStatus === "Cancelled";
    }
    return matchesSearch && matchesStatus;
  });

  // 🔹 Summary calculations
  const totals = filteredData.reduce(
    (acc, item) => {
      acc.totalBookings += 1;
      acc.totalAmount += item.price;
      acc.paidAmount += item.paidAmount;
      acc.pendingAmount += item.pendingAmount;
      return acc;
    },
    { totalBookings: 0, totalAmount: 0, paidAmount: 0, pendingAmount: 0 }
  );

  const getStatusChip = (item: BillData) => {
    if (item.pendingAmount === 0 && item.deliveryStatus === "Deliverd")
      return (
        <Chip
          label="SALE : PAID"
          style={{ backgroundColor: "#4caf50", color: "#fff" }}
        />
      );
    if (item.pendingAmount > 0 && item.deliveryStatus === "Deliverd")
      return (
        <Chip
          label="SALE : PARTIAL"
          style={{ backgroundColor: "#03a9f4", color: "#fff" }}
        />
      );
    if (item.pendingAmount > 0)
      return (
        <Chip
          label="SALE : UNPAID"
          style={{ backgroundColor: "#ff9800", color: "#fff" }}
        />
      );
    return <Chip label={item.status} />;
  };

  // ✅ Full Payment
  const handleFullPayment = async (item: BillData) => {
    const updatedItem = {
      ...item,
      apiRequestFor: "update",
      paidAmount: item.price,
      pendingAmount: 0,
      status: "Paid",
    };

    try {
      setApiLoading(true);
      const response = await axios.post(
        "https://gunjalpatilserver.onrender.com/data/",
        updatedItem,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setData((prev) =>
          prev.map((d) => (d.id === item.id ? updatedItem : d))
        );
        setSelectedItem(updatedItem);
        enqueueSnackbar("Payment marked as FULL RECEIVED", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar("Failed to update payment", { variant: "error" });
    } finally {
      setApiLoading(false);
    }
  };

  // ✅ Delivery Update
  const handleDeliveryUpdate = async (item: BillData, newStatus: string) => {
    const updatedItem = {
      ...item,
      apiRequestFor: "update",
      deliveryStatus: newStatus,
    };

    try {
      setApiLoading(true);
      const response = await axios.post(
        "https://gunjalpatilserver.onrender.com/data/",
        updatedItem,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setData((prev) =>
          prev.map((d) => (d.id === item.id ? updatedItem : d))
        );
        setSelectedItem(updatedItem);
        enqueueSnackbar("Delivery status updated!", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to update delivery", { variant: "error" });
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div style={{ background: "#ffffff" }}>
      {/* 🔹 Global Loader */}
      <Backdrop open={apiLoading} style={{ zIndex: 2000, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* 🔹 Filter Tabs */}
      <Grid
        container
        spacing={1}
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid #eee",
          marginBottom: 8,
        }}
      >
        {Object.entries(statusCounts).map(([status, count]) => (
          <Grid item key={status}>
            <Chip
              label={`${status} (${count})`}
              clickable
              color={statusFilter === status ? "primary" : "default"}
              onClick={() => setStatusFilter(status)}
            />
          </Grid>
        ))}
      </Grid>

      {/* 🔹 Summary Row */}
      <Grid
        container
        spacing={2}
        style={{ padding: "0 16px 16px", borderBottom: "1px solid #eee" }}
      >
        <Grid item xs={6} md={3}>
          <Typography variant="body2">
            Total Bookings: <b>{totals.totalBookings}</b>
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="body2">
            Total Amount: <b>₹{totals.totalAmount}</b>
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="body2" style={{ color: "green" }}>
            Paid: <b>₹{totals.paidAmount}</b>
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="body2" style={{ color: "red" }}>
            Pending: <b>₹{totals.pendingAmount}</b>
          </Typography>
        </Grid>
      </Grid>

      {/* 🔹 Search */}
      <Grid container spacing={2} style={{ padding: "16px" }}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            placeholder="Search for a transaction"
            fullWidth
            margin="dense"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <FilterList />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* Transactions List */}
      <Grid container spacing={2} style={{ padding: "0 16px 16px" }}>
        {loading ? (
          <Typography variant="h6" align="center" style={{ width: "100%" }}>
            Loading...
          </Typography>
        ) : filteredData.length === 0 ? (
          <Typography variant="body1" align="center" style={{ width: "100%" }}>
            No records found
          </Typography>
        ) : (
          <Grid container spacing={2} style={{ padding: "0 16px" }}>
            {filteredData.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Card
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedItem(item);
                    setDeliveryStatus(item.deliveryStatus || "");
                  }}
                >
                  <CardContent>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: 600 }}
                      >
                        {item.firstName}
                      </Typography>
                      {getStatusChip(item)}
                    </Grid>

                    <Grid container spacing={1} style={{ marginTop: 8 }}>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Total: ₹{item.price}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          style={{
                            color: item.pendingAmount === 0 ? "green" : "inherit",
                            fontWeight: item.pendingAmount === 0 ? 600 : 400,
                          }}
                        >
                          Paid: ₹{item.paidAmount}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Balance: ₹{item.pendingAmount}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Delivery: {item.deliveryStatus || "-"}
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* 🔹 Action Icons */}
                    <Grid
                      container
                      justifyContent="flex-end"
                      spacing={1}
                      style={{ marginTop: 4 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            const pdf = generateInvoicePDF(item);
                            pdf.autoPrint();
                            pdf.output("dataurlnewwindow");
                          }}
                        >
                          <Print />
                        </IconButton>
                      </Grid>

                      <Grid item>
                        <IconButton
                          onClick={() => {
                            const pdf = generateInvoicePDF(item);
                            const blob = pdf.output("blob");
                            const file = new File(
                              [blob],
                              `invoice_${item.id}.pdf`,
                              { type: "application/pdf" }
                            );

                            if (navigator.share && navigator.canShare({ files: [file] })) {
                              navigator
                                .share({
                                  title: "Invoice",
                                  text: "Here is your invoice",
                                  files: [file],
                                })
                                .catch(() => console.error("Share failed"));
                            } else {
                              const blobUrl = URL.createObjectURL(blob);
                              window.open(blobUrl, "_blank");
                            }
                          }}
                        >
                          <Share />
                        </IconButton>
                      </Grid>

                      <Grid item>
                        <IconButton
                          onClick={() => {
                            const pdf = generateInvoicePDF(item);
                            pdf.save(`invoice_${item.id}.pdf`);
                          }}
                        >
                          <PictureAsPdf />
                        </IconButton>
                      </Grid>

                      <Grid item>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            const pdf = generateInvoicePDF(item);
                            const blob = pdf.output("blob");
                            const file = new File(
                              [blob],
                              `invoice_${item.id}.pdf`,
                              { type: "application/pdf" }
                            );

                            const message = `🙏 *नमस्कार ${item.firstName}* 🙏

आपली ऑर्डर तपशील:
• उत्पादन: ${item.comboPack}
• प्रमाण: ${item.qty}
• रक्कम: ₹${item.price}
• भरलेले: ₹${item.paidAmount}
• बाकी: ₹${item.pendingAmount}`;

                            const phone = (item.phone ?? "")
                              .toString()
                              .replace(/\D/g, "");
                            if (!phone) {
                              enqueueSnackbar("Invalid phone number", {
                                variant: "warning",
                              });
                              return;
                            }

                            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
                              message
                            )}`;

                            if (
                              navigator.share &&
                              navigator.canShare({ files: [file] })
                            ) {
                              navigator
                                .share({
                                  title: "Invoice",
                                  text: message,
                                  files: [file],
                                })
                                .catch(() => {
                                  window.open(whatsappUrl, "_blank");
                                });
                            } else {
                              window.open(whatsappUrl, "_blank");
                            }
                          }}
                        >
                          <WhatsApp style={{ color: "green" }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      {/* Dialog for full details */}
      <Dialog
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent dividers>
          {selectedItem && (
            <>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" gutterBottom>
                  Customer: {selectedItem.firstName}
                </Typography>
                {getStatusChip(selectedItem)}
              </Grid>

              <Typography variant="body2">Phone: {selectedItem.phone}</Typography>
              <Typography variant="body2">
                Address: {selectedItem.address}
              </Typography>
              <Typography variant="body2">
                Product: {selectedItem.comboPack}
              </Typography>
              <Typography variant="body2">Qty: {selectedItem.qty}</Typography>
              <Typography variant="body2">
                Total: ₹{selectedItem.price}
              </Typography>
              <Typography variant="body2">
                Paid: ₹{selectedItem.paidAmount}
              </Typography>
              <Typography variant="body2">
                Pending: ₹{selectedItem.pendingAmount}
              </Typography>
              <Typography variant="body2">
                Payment Mode: {selectedItem.paymentMode}
              </Typography>
              <Typography variant="body2">
                Delivery Date:{" "}
                {selectedItem.deliveryDate
                  ? new Date(selectedItem.deliveryDate).toLocaleDateString("en-GB")
                  : "-"}
              </Typography>

              <FormControl fullWidth style={{ marginTop: 16 }}>
                <InputLabel>Delivery Status</InputLabel>
                <Select
                  value={deliveryStatus}
                  onChange={(e) => setDeliveryStatus(e.target.value as string)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                  <MenuItem value="Deliverd">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {selectedItem && selectedItem.pendingAmount > 0 && (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleFullPayment(selectedItem)}
            >
              Payment Full Receive
            </Button>
          )}
          <Button onClick={() => setSelectedItem(null)}>Close</Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              if (selectedItem) {
                handleDeliveryUpdate(selectedItem, deliveryStatus);
              }
              setSelectedItem(null);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllData;
