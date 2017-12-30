import JSZip from 'jszip'
import Docxtemplater from 'docxtemplater'
import fs from 'fs'

/**
 * @param {string} src - путь до файла шаблона
 * @param {string} dst - путь до результирующего файла
 * @param {Object} data - Объект с данными для подстановки в шаблон
 */
function docxRender (src, dst, data) {
  let content = fs.readFileSync(src, 'binary')
  let zip = new JSZip(content)
  let doc = new Docxtemplater()
  doc.loadZip(zip)
  doc.setData(data)
  try {
    doc.render()
  } catch (error) {
    let e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties
    }
    console.log(JSON.stringify({error: e}))
    throw error
  }
  let buf = doc.getZip().generate({type: 'nodebuffer'})
  fs.writeFileSync(dst, buf)
}

export default docxRender
