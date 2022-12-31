import { Typography } from "@mui/material";
import img from "../assets/j&p_img_candle.jpg";


export default function Home() {
  return (
    <div>
      <Typography
        variant="h2"
        sx={{ mt: 3 }} //mezera nad textem
        color="primary"
        //align="center" //zarovná doprostřed
        gutterBottom //vytvoří mezeru pod textem
      >
        Firemní systém J&P CANDLES
      </Typography>
      <img src={img} width="390" height="285" alt="img" />
    </div>
  );
}
