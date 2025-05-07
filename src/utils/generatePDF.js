import jsPDF from "jspdf";
import "jspdf-autotable"
import {supabase} from "../supabaseClient";

export const generatePDF = async ({table, header, mapRow}) => {
    const {data, error} = await supabase
        .from(table)
        .select("*")
        .order("sign_in_time", { ascending:true})

    if (error) {
        alert(`Failed to fetch data from ${table}`);
        console.error(error.message);
        return
    }

    const rows = data.map(mapRow);

    const doc = new jsPDF({orientation: "landscape"});

    doc.autoTable({
        head: [header],
        body: rows,
        startY: 0,
        styles: {fontSize: 8},
        margin: { bottom: 50},
    });

    const blob = doc.output("blob");
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
}