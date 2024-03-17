const main = async () => {
  const res = await fetch("https://stockanalysis.com/stocks/");
  const data = await res.text();
  console.log(data);
};

main();
