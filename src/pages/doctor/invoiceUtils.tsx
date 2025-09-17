import jsPDF from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';

import logo from '../../assets/Icons/logo.png';
import { BillData } from './AllData';

export const generateInvoicePDF = (item: BillData): jsPDF => {
    const doc = new jsPDF();

    // -------- COMPANY INFO + LOGO --------
    doc.setFontSize(14).setFont('helvetica', 'bold');
    doc.text('Gunjal Patil Bhel And Misal', 10, 35);

    doc.setFontSize(10).setFont('helvetica', 'normal');
    doc.text('58/2 Gunjal Patil Corner, Jakhuri, ta-Sangamner, dist-Ahilyanagar', 10, 41);
    doc.text('Mo: 8888147262', 10, 47);
    doc.text('Phone: 9923469913', 10, 53);

    doc.addImage(logo, 'PNG', 160, 28, 35, 20);

    // -------- BILL TO + INVOICE DETAILS --------
    doc.setFontSize(11).setFont('helvetica', 'bold');
    doc.text('Bill To:', 10, 65);

    doc.setFont('helvetica', 'normal');
    doc.text(item.firstName || '-', 10, 72);
    if (item.address) doc.text(item.address, 10, 78);
    doc.text(`Phone: ${item.phone || '-'}`, 10, 84);

    doc.text(`Ref No: ${item.id}`, 190, 65, { align: 'right' });
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 190, 72, { align: 'right' });
    doc.text(
        `Delivery: ${item.deliveryDate ? new Date(item.deliveryDate).toLocaleDateString('en-GB') : '-'}`,
        190,
        79,
        { align: 'right' }
    );

    // -------- ITEMS TABLE --------
    const qty = item.qty || 0;
    const comboPrice = item.comboPrice || 0;
    const discount = parseFloat(item.discount?.toString() || '0');
    const deliveryCharges = parseFloat(item.deliveryCharges?.toString() || '0');

    const productTotal = comboPrice * qty;
    const totalAfterDiscount = productTotal - (discount > 0 ? discount : 0);
    const grandTotal = totalAfterDiscount + deliveryCharges;

    // Table Body
    const tableBody: any[] = [
        [
            item.comboPack || 'Product',
            qty,
            comboPrice.toFixed(2),
            productTotal.toFixed(2),
            item.status || '-',
            discount > 0 ? discount.toFixed(2) : '-',
        ],
    ];

    if (deliveryCharges > 0) {
        tableBody.push([
            'Delivery Charges',
            '-',
            '-',
            deliveryCharges.toFixed(2),
            '-',
            '-',
        ]);
    }

    const tableOptions: UserOptions = {
        startY: 95,
        head: [['Name', 'Qty', 'Price', 'Amount', 'Status', 'Discount']],
        body: tableBody,
        styles: { fontSize: 10, valign: 'middle' },
        headStyles: { fillColor: [230, 230, 230], textColor: 0, halign: 'center' },
        columnStyles: {
            0: { halign: 'left' }, // Name
            1: { halign: 'right' }, // Qty
            2: { halign: 'right' }, // Price
            3: { halign: 'right' }, // Amount
            4: { halign: 'center' }, // Status
            5: { halign: 'right' }, // Discount
        },
    };

    autoTable(doc, tableOptions);

    // -------- TOTALS SECTION --------
    const finalY =
        (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 120;

    const totals = [
        ['Subtotal', productTotal.toFixed(2)],
        ...(discount > 0 ? [['Discount', discount.toFixed(2)]] : []),
        ...(deliveryCharges > 0 ? [['Delivery Charges', deliveryCharges.toFixed(2)]] : []),
        ['Grand Total', grandTotal.toFixed(2)],
        ['Received', (item.paidAmount || 0).toFixed(2)],
        ['Balance', (item.pendingAmount || 0).toFixed(2)],
    ];

    autoTable(doc, {
        startY: finalY + 5,
        body: totals,
        theme: 'plain',
        styles: { fontSize: 11 },
        columnStyles: {
            0: { halign: 'right', fontStyle: 'bold' },
            1: { halign: 'right' },
        },
    });

    // -------- FOOTER --------
    const footerY =
        (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? finalY + 20;
    doc.setFontSize(11).setFont('helvetica', 'normal');
    doc.text(item.note || '', 105, footerY + 10, { align: 'center' });

    return doc;
};
