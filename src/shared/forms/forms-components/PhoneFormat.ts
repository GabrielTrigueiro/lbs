export default function formatarTelefone(telefone:string) {
    let r = telefone.replace(/\D/g, "");
    r = r.replace(/^0/, "");
  
    if (r.length > 11) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "$1 $2 $3");
    } else if (r.length > 7) {
      r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "$1 $2 $3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "$1 $2");
    } else if (telefone.trim() !== "") {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }