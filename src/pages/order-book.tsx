const OrderBookPage = () => {
  return (
    <div>
      <h1 className="text-3xl">Order book:</h1>
      <div className="mx-auto mt-8 grid h-16 w-[80%] grid-cols-3">
        <div className="col-span-1 bg-red-700" />
        <div className="col-span-2 bg-blue-700" />
      </div>
    </div>
  );
};

export default OrderBookPage;
