export function timeConverter(UNIX_timestamp, output) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var year = a.getFullYear()?.toString();
  var month = months[a.getMonth()]?.toString();
  var dateNotConverted = a.getDate()?.toString();
  var day = days[a.getDay()]?.toString();
  var date =
    dateNotConverted.length !== 1 ? dateNotConverted : "0" + dateNotConverted;
  var hour = a.getHours()?.toString();
  var minNotConverted = a.getMinutes()?.toString();
  var min =
    minNotConverted.length !== 1 ? minNotConverted : "0" + minNotConverted;
  var sec = a.getSeconds()?.toString();

  if (output === "full") {
    return (
      year + "-" + month + "-" + date + "  " + hour + ":" + min + ":" + sec
    );
  } else if (output === "hour") {
    return hour;
  } else if (output === "date_month_year") {
    return year + "-" + month + "-" + date;
  } else if (output === "hour_min") {
    return hour > 12 ? hour - 12 + ":" + min + " PM" : hour + ":" + min + " AM";
  } else if (output === "day") {
    return day;
  }
}
