function DownloadPDF() {
  return (
    <button style={{color: "aqua",textDecoration:"underline",cursor:"pointer"}}
      onClick={() => {
        const link = document.createElement("a");
        link.href = "/DSA_Syllabus.pdf";
        link.download = "DSA-Syllabus.pdf";
        link.click();
      }}
    >
      Download Syllabus
    </button>
  );
}

export default DownloadPDF;