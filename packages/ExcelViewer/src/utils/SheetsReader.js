export default class SheetReader {
  constructor(workbook, xlsx) {
    this.sheets = {}
    this.xlsx = xlsx
    this.sheetNames = workbook.SheetNames
    console.log(workbook)
    this.read(workbook.SheetNames, workbook.Sheets)
  }

  read(SheetNames, Sheets) {
    SheetNames.forEach(v => {
      let sheetData = {}
      let sheet = Sheets[v]
      
      sheetData.headerTop = 0
      sheetData.sideLeft = 0
      sheetData.colToLetter = {}
      sheetData.letterToCol = {}
      sheetData.data = {}
      Object.keys(sheet).forEach(k => {
        if (k.startsWith("!")) {
          sheetData[k.split("!")[1]] = sheet[k]
          return
        }
        let colIndex = this.getColIndex(k)
        let rowIndex = this.getRowIndex(k)
        sheetData.data[k] = sheet[k]
        sheetData.maxCol = Math.max(sheetData.maxCol || 0, colIndex)
        sheetData.maxRow = Math.max(sheetData.maxRow || 0, rowIndex)
      })
      sheetData.parsedMerges = this.parseMerges(sheetData)
      this.convertColLetter(sheetData)
      Object.keys(sheetData.parsedMerges).forEach(k => {
        let { start, end } = sheetData.parsedMerges[k]
        let curSheetData = sheetData.data[start.pos]
        curSheetData.colspan = (end.col - start.col + 1)
        curSheetData.rowspan = (end.row - start.row + 1)

        let spanedCells = []

        for (let j = 0; j < curSheetData.colspan; j++) {
          for (let k = 0; k < curSheetData.rowspan; k++) {
            let le = `${sheetData.colToLetter[start.col + j]}${start.row + k}`
            if (j > 0 || k > 0) {
              spanedCells.push(le)
            }
          }
        }
        spanedCells.forEach(k => {
          sheetData.data[k] = {
            spaned: true
          }
        })
      })
      sheetData.tableWidth = 0
      if(sheetData.cols && sheetData.cols.length > sheetData.maxCol) {
        sheetData.cols = sheetData.cols.slice(0, sheetData.maxCol)
        sheetData.cols.forEach(({wpx})=>{
          sheetData.tableWidth += wpx * 1.8
        })
      }
      let sheetToFormulae = this.xlsx.utils.sheet_to_formulae(sheet)
      sheetData.text = {}
      if(sheetToFormulae) {
        sheetToFormulae.forEach(v=>{
          let pos = ""
          let text = ""
          if(/^[A-Z]+\d+='/.test(v)){
            pos = v.split("='")[0]
            text = v.split(/^[A-Z]+\d+='/)[1]
          } else if(/^[A-Z]+\d+=/.test(v)){
            pos = v.split("=")[0]
            text = v.split(/^[A-Z]+\d+=/)[1]
          }
          if(pos){
            pos = 
            sheetData.text[`${this.getRowIndex(pos)}-${this.getColIndex(pos)}`] = text
          }
        })
      }
      this.sheets[v] = sheetData
    })
  }

  convertColLetter(sheetData) {
    for (let i = 0; i < sheetData.maxCol; i++) {
      let letter = this.getColLetter(i + 1)
      sheetData.colToLetter[i + 1] = letter
      sheetData.letterToCol[letter] = this.getColIndex(`${letter}1`)
    }
  }

  getRowIndex(k) {
    let idx = 0
    let _ = k.split(/[A-Z]/)
    idx = Number(_[_.length - 1])
    return idx
  }

  getColLetter(col) {
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let letter = ""
    if (col <= 26) {
      letter = letters[col - 1]
    } else {
      if (col % 26 === 0) {
        letter = `${letters[Math.floor(col / 26) - 2]}Z`
      } else {
        letter = `${letters[Math.floor(col / 26) - 1]}${letters[(col % 26) - 1]}`
      }
    }
    return letter
  }

  getColIndex(k) {
    let lettersMap = {
      "A": 1, "B": 2, "C": 3, "D": 4, "E": 5, "F": 6, "G": 7, "H": 8, "I": 9, "J": 10, "K": 11, "L": 12, "M": 13, "N": 14, "O": 15, "P": 16, "Q": 17, "R": 18, "S": 19, "T": 20, "U": 21, "V": 22, "W": 23, "X": 24, "Y": 25, "Z": 26
    }
    let idx = 0
    let _ = k.split(/[A-Z]/)
    if (_.length === 2) {
      idx = lettersMap[k[0]]
    } else if (_.length === 3) {
      idx = lettersMap[k[0]] * 26 + lettersMap[k[1]]
    }

    return idx
  }

  parseMerges(sheetData) {
    let parsedMerges = {}
    if (sheetData.merges) {
      sheetData.merges.forEach(({ s, e }) => {
        let start = {
          row: s.r + 1,
          col: s.c + 1,
        }
        start.colLetter = this.getColLetter(start.col)
        start.pos = `${start.colLetter}${start.row}`
        let end = {
          row: e.r + 1,
          col: e.c + 1
        }
        end.colToLetter = this.getColLetter(end.col)
        end.pos = `${end.colToLetter}${end.row}`
        parsedMerges[`${start.pos}-${end.pos}`] = {
          start,
          end
        }
        sheetData.maxCol = Math.max(sheetData.maxCol || 0, end.col)
        sheetData.maxRow = Math.max(sheetData.maxRow || 0, end.row)
      })
    }
    return parsedMerges
  }
}