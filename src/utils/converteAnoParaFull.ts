export default function converteAnoParaFull(data: String){
  const [dia, mes, ano] = data.split('/').map(String);
  return `${dia}/${mes}/${new Date().getFullYear()}`
}