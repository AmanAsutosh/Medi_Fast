const {PDFDocument,StandardFonts,rgb}=require('pdf-lib')
const fs=require('fs')
const path=require('path')

async function generatePdf(name,age,symptoms) {
    const templatePath = path.join(process.cwd(), "MEDIFAST_template.pdf");
    const pdfBytes = fs.readFileSync(templatePath);

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const font=await pdfDoc.embedFont(StandardFonts.Helvetica)

    const page=pdfDoc.getpage(0)

    page.drawText(name,{
        x:80,
        y:150,
        size:12,
        font
    })
    page.drawText(age,{
        x:80,
        y:120,
        size:12,
        font
    })
    page.drawText(symptoms,{
        x:80,
        y:90,
        size:12,
        font
    })
    const modifiedpdf=await pdfDoc.save()
    
    return modifiedpdf;
}

module.exports=generatePdf