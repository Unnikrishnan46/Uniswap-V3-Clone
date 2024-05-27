import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface props {
  coinData: [];
  isLoading: boolean;
  currentPage:any;
}

const CoinTable = ({ coinData, isLoading ,currentPage}: props) => {
  const router = useRouter();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleCoinClick = (id)=>{
    router.push(`/token/${id}`);
  }

  return (
    <Table className="border rounded-3xl mt-4">
      <TableHeader className="rounded-3xl bg-gray-100">
        <TableRow className="rounded-3xl">
        <TableHead className="w-10">#</TableHead>
          <TableHead >Coin</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>24 Hr change</TableHead>
          <TableHead className="text-right">Market cap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coinData?.slice((currentPage-1)*10,(currentPage-1)*10 + 10).map((coin:any,index:any) => {
          const profit = coin.price_change_percentage_24h > 0;
          return (
            <TableRow onClick={()=>{handleCoinClick(coin?.id)}} key={coin?.name}>
                <TableCell>{coin?.market_cap_rank}</TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                    <img className="h-10 w-10" src={coin?.image} alt="" />
                    <span>{coin?.name}</span>
                    <span className="uppercase font-semibold text-gray-600">{coin?.symbol}</span>
                </div>
              </TableCell>
              <TableCell>{numberWithCommas(coin?.current_price.toFixed(2))}</TableCell>
              <TableCell className={cn("font-medium",profit ? "text-green-500":"text-red-500")}>
                {profit && "+"}
                {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
              <TableCell className="text-right">
                {numberWithCommas(coin.market_cap.toString().slice(0,-6))} M
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CoinTable;
