export default function formateDate(date, fullMonth = "long") {
    const newDate = new Date(date)
    let dd = newDate.getDate()
    if (dd < 10) dd = '0' + dd

    let mm = newDate.toLocaleString('ru', { month: `${fullMonth}` });

    let yyyy = newDate.getFullYear()

    return `${dd} ${mm} ${yyyy}`

}