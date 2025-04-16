import { supabase } from "../supabaseClient";

export async function dataInsert(tableName, record) {
    try {
        const { data, error } = await supabase
        .from(tableName)
        .insert([record]);

    if (error) {
        console.error(`Insert error into ${tableName}:`, error.message);
        return {success: false, error}
    } else {
        alert("Success");
        return {success: true, data}
    }
    } catch (err) {
        console.error(`Error inserting into: ${tableName}:` , err);
        return {success: false, error: err}
    }
}