import React from 'react'

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


function BasicCard({ typeItem, type, typeCount, ...props }) {

  return (
    <Card sx={{ minWidth: 80 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {typeItem}
        </Typography> */}
        <Typography color="primary.main" variant="h5" component="div">
          {type.name}
        </Typography>
        {typeCount >= 0 && (
          <Typography color="text.secondary">
            Počet položek: {typeCount}
          </Typography>
        )}
        {/* {{ type.note } !== "" && <Typography variant="body2">{type.note}</Typography>} */}
      </CardContent>
      <CardActions>
        <Button
          //disabled
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => props.edit(type)}
        >
          Upravit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={(e) => props.delete(type, e)}
        >
          Vymazat
        </Button>
      </CardActions>
    </Card>
  );
}

export default BasicCard;