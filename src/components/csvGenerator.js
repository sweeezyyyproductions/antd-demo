export default function csvGenerator(fileNames) {
    const csvContent = "data:text/csv;charset=utf-8," 
        + fileNames.map(e => `"${e.replace(/"/g, '""')}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "podcast_names.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}