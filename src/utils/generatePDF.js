import jsPDF from "jspdf";
import "jspdf-autotable";
import supabase from "../supabaseClient";

export const generatePDF = async ({table, title, header, mapRow}) => {
    const {data, error} = await supabase.from(table).select("*");

    if (error) {
        alert(`Failed to fetch data from ${table}`);
        console.error(error.message);
        return
    }

    const rows = data.map(mapRow);

    const doc = new jsPDF();
    doc.text(`${title} (${table})`, 14, 15);

    doc.autoTable({
        head: [header],
        body: rows,
        startY: 20,
        styles: {fontSize: 10},
        margin: {top: 20}
    });

    doc.save(`${table}-report.pdf`)
}