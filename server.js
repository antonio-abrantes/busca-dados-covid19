/**
 * Celulas de captura dos dados
    s6 = data
    s15 = suspeitos
    s16 = confirmados
    s18 = descartados
    s19 = hospitalizados, isol. domiciliar, recuperados, óbitos
    s26 = Suspeitos + Confirmados
    s27 = Ativos
    s28 = Taxa de mortalidade
 */
require('dotenv').config();
const http = require("http");
const express = require("express");
const app = express();

const site = process.env.SCRAPING_URL;

const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(site)
  const result = await page.evaluate(() => {
    const objeto = {
        data:"", suspeitos:"", confirmados:"", descartados:"", recuperados:"", obitos:""
    }  
    const celulaS19 = []
    document.querySelectorAll('div[id="455284170"] > div[class="ritz grid-container"] > table > tbody > tr > td')
            .forEach((celula) => {
                
                if(celula.className === 's6'){
                    objeto.data = celula.textContent;
                }
                if(celula.className === 's15'){
                    objeto.suspeitos = celula.textContent;
                }
                if(celula.className === 's16'){
                    objeto.confirmados = celula.textContent;
                }
                if(celula.className === 's18'){
                    objeto.descartados = celula.textContent;
                }
                if(celula.className === 's19'){
                    celulaS19.push(celula.textContent);
                }                              
            });
            objeto.recuperados = celulaS19[2];
            objeto.obitos = celulaS19[3];
    return objeto;
  })
  browser.close()
  return result
}
scrape()
.then((value) => {
  console.log(value)
})

// app.get("/", function(req, res) {
//     res.send("<h1>Servidor rodando com Node & ExpressJS</h1>");
// });
const PORT = process.env.PORT || 3000;
http.createServer(app).listen(PORT, () => console.log("Servidor rodando local na porta 3000"));