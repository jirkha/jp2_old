import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import { Stack, Typography, Box } from "@mui/material";
import logo from '../assets/JP_logo_black.png';

const Footer = () => {

    return (
      <>
        {/* <Container>
          <Row className="text-center py-3">
            <Col>
              <hr />
              <h1>J&P CANDLES</h1>

              <Col>
                <img src={logo} width="140" height="35" alt="Logo" />
              </Col>
            </Col>
          </Row>
        </Container> */}
        <hr />
        <Stack
          component="footer"
          direction="row"
          sx={{ justifyContent: "space-evenly" }}
        >
          <Typography variant="h5" color="primary">
            J&P CANDLES
          </Typography>
          <Box
            component="img"
            src={logo}
            sx={{ width: "180px", height: "45px" }}
            width="50"
            height="25"
            alt="Logo"
          />
          <Typography variant="h5" color="primary">
            © Jiří Vecko
          </Typography>
        </Stack>
      </>
    );

}

export default Footer;