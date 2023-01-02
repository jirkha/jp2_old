import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Axios from "axios";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Container, Typography, Divider, Grid } from "@mui/material";
import { Popup } from '../components/Global/Other/Popup';
import AddItemForm from '../components/Material/AddItemForm';


const MaterialPage = () => {

  const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState("Vložení nového materiálu");
  let {materialId} = useParams();
    let [material, setMaterial] = useState(null)
    // console.log({material.updated})

    useEffect(()=> {
        getMaterialDetail()
    }, [materialId])

    let getMaterialDetail = async () => {
        Axios.get(`/api/item_detail/${materialId}`).then((res) => {
          setMaterial(res.data.m_ser);
          //console.log("Data načtena", res.data.m_ser);
        });
    }

    const editAction = (item) => {
      //console.log("item", item);
      //setItem(item);
      setTitle(`Editace materiálu ${item.name}`);
      setOpenPopup(true);
    };

    const navigate = useNavigate(); 

    const postDelete = (id, e) => {
      e.preventDefault();
      Axios.delete(`/api/item_delete/${id}`)
        .then(() => {
          console.log("Deleted!");
          getMaterialDetail();
          navigate("/material");
        })
        .catch((err) => console.log(err));
  }
    
    return (
      <>
        <Container sx={{ mt: 2 }}>
          <Link to="/material">
            <ArrowBackIcon color="primary" />
          </Link>
          <Typography
            variant="h3"
            color="primary"
            gutterBottom //vytvoří mezeru pod textem
          >
            {material?.name}
          </Typography>
          {/* <Typography variant="subtitle1">ID: {material?.m_ser.id}</Typography>
        <Typography variant="h6">Typ: {material?.m_ser.type.name}</Typography> */}

          <Grid
            container
            spacing={2}
            //direction={"row"}
            alignContent={"center"}
            //xs={12}
          >
            <Grid
              //container
              item
              xs={3}
              //justifyContent={"start"}
            >
              <Typography variant="subtitle1" color="primary">
                Identifikační číslo
              </Typography>
            </Grid>
            <Grid
              //container
              item
              xs={9}
              //justifyContent={"start"}
            >
              <Typography variant="subtitle1">{material?.id}</Typography>
            </Grid>
            <Divider variant="middle" style={{ width: "80%" }} />
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Typ materiálu
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">{material?.type.name}</Typography>
            </Grid>
            <Divider variant="middle" style={{ width: "80%" }} />
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Cena materiálu
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                {material?.costs} Kč za {material?.unit}
              </Typography>
            </Grid>
            <Divider variant="middle" style={{ width: "80%" }} />
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Množství naskladněného materiálu
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                {material?.quantity_of_material} {material?.unit}
              </Typography>
            </Grid>
            <Divider variant="middle" style={{ width: "80%" }} />
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Dodavatel
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">{material?.supplier}</Typography>
            </Grid>
            <Divider variant="middle" style={{ width: "80%" }} />
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Odkaz
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                <a href={material?.link}>{material?.link}</a>
              </Typography>
            </Grid>
            <Divider variant="middle" style={{ width: "80%" }} />
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Vytvořeno
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                {/* {format(new Date(material?.m_ser.created), "dd.MM.yyyy kk:mm:ss")} */}
                {material?.created}
              </Typography>
            </Grid>
            <Divider variant="middle" style={{ width: "80%" }} />
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Upraveno
              </Typography>
            </Grid>
            <Grid item xs={9} sx={{ mb: 5 }}>
              <Typography variant="subtitle1">
                {/* {format(new Date(material?.m_ser.updated), "dd.MM.yyyy kk:mm:ss")} */}
                {material?.updated}
              </Typography>
            </Grid>
          </Grid>

          <Button
            type="delete"
            variant="contained"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={(e) => postDelete(material?.id, e)}
          >
            Vymazat
          </Button>
          <Button
            variant="contained"
            //href={`/edit_material/${material?.id}`}
            onClick={() => editAction(material)}
            startIcon={<EditIcon />}
            color="primary"
          >
            Upravit
          </Button>
        </Container>
        <Popup title={title} openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <AddItemForm
            item={material}
            setOpenPopup={setOpenPopup}
            getMaterialDetail={getMaterialDetail}
          />
        </Popup>
      </>
    );
}

export default MaterialPage