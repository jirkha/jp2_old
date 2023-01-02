import React from 'react'
import { Box, Stack, Divider, Grid, Typography } from "@mui/material";
import { CheckboxTable } from "../components/Global/Checkbox";

export  const TestPage = () => {
  return (
    <>
      {/* Stack se používá pro jednorozměrné rozložení */}
      <Stack
        sx={{ justifyContent: "center", border: "1px solid" }}
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box
          component="div"
          sx={{
            bgcolor: "primary.main",
            color: "black", // barva ohraničení
            height: "50px", // výška
            width: "50px", // šířka
            p: "60px", // (padding) odsazení od obsahu umístěného uvnitř
            //pl: 20,
            flexWrap: "wrap", // zalomí položky, pokud by přetékaly okraj
            border: 10, // ohraničení
            justifyContent: "center", // vzájemné rozmístění položek uvnitř
            borderRadius: "160px", //zaoblení
            display: "inline-flex", // umístění obsahu
            flexDirection: "row", // forma umístění obsahu
            mb: 0, // (margin) mezera pod boxem
            m: 0, // mezera (obtékání) ze všech stran
            textAlign: "center", //zarovnání textu
            fontSize: 10, // velikost textu
            fontWeight: "bold", //tloušťka písma
            letterSpacing: "3px", // mezery mezi písmeny
          }}
        >
          <Box
            sx={{
              component: "div",
              bgcolor: "secondary.main",
              display: "inline-flex", // umístění obsahu
              // inline = vedle sebe
              // block = pod sebe
              flexDirection: "row",
              color: "white",
              // width: "26%",
              // height: "26%",
              border: 10,
            }}
          >
            <CheckboxTable />
            <CheckboxTable />
            <CheckboxTable />
          </Box>

          {/* <Box
          sx={{
            component: "div",
            bgcolor: "succes.main",
            display: "inline-flex",
            width: "76%",
            height: "76%",
            //flexDirection: "column",
            color: "green",
            border: 10,
            overflow: "auto",
          }}
        >
          <CheckboxTable />
          <CheckboxTable />
          <CheckboxTable />
        </Box> */}
          {/* <Box
          sx={{
            component: "div",
            bgcolor: "succes.main",
            display: "inline-flex",
            color: "green",
            width: "26%",
            height: "26%",
            border: 10,
            overflow: "auto",
          }}
        >
          <CheckboxTable />
          <CheckboxTable />
          <CheckboxTable />
        </Box>
        <Box
          sx={{
            component: "div",
            bgcolor: "succes.main",
            flexDirection: "column",
            display: "inline-flex",
            width: "26%",
            height: "26%",
            color: "green",
            border: 10,
            overflow: "scroll",
          }}
        >
          <CheckboxTable />
          <CheckboxTable />
          <CheckboxTable />
        </Box> */}
        </Box>
        <Box
          component="div"
          sx={{
            bgcolor: "primary.main",
            color: "black", // barva ohraničení
            height: "50px", // výška
            width: "50px", // šířka
            p: "60px", // (padding) odsazení od obsahu umístěného uvnitř
            //pl: 20,
            flexWrap: "wrap", // zalomí položky, pokud by přetékaly okraj
            border: 10, // ohraničení
            justifyContent: "space-evenly", // vzájemné rozmístění položek uvnitř
            borderRadius: "160px", //zaoblení
            display: "inline-flex",
            flexDirection: "row",
            mb: 10, // (margin) mezera pod boxem
            m: 10, // mezera (obtékání) ze všech stran
            textAlign: "center", //zarovnání textu
            fontSize: 10, // velikost textu
            fontWeight: "bold", //tloušťka písma
            letterSpacing: "3px", // mezery mezi písmeny
          }}
        >
          <Box
            sx={{
              component: "div",
              bgcolor: "secondary.main",
              display: "inline-flex", // umístění obsahu
              // inline = vedle sebe
              // block = pod sebe
              flexDirection: "row",
              color: "white",
              // width: "26%",
              // height: "26%",
              border: 10,
            }}
          >
            <CheckboxTable />
            <CheckboxTable />
            <CheckboxTable />
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            bgcolor: "primary.main",
            color: "black", // barva ohraničení
            height: "50px", // výška
            width: "50px", // šířka
            p: "60px", // (padding) odsazení od obsahu umístěného uvnitř
            //pl: 20,
            flexWrap: "wrap", // zalomí položky, pokud by přetékaly okraj
            border: 10, // ohraničení
            justifyContent: "space-evenly", // vzájemné rozmístění položek uvnitř
            borderRadius: "160px", //zaoblení
            display: "inline-flex",
            flexDirection: "row",
            mb: 10, // (margin) mezera pod boxem
            m: 10, // mezera (obtékání) ze všech stran
            textAlign: "center", //zarovnání textu
            fontSize: 10, // velikost textu
            fontWeight: "bold", //tloušťka písma
            letterSpacing: "3px", // mezery mezi písmeny
          }}
        >
          <Box
            sx={{
              component: "div",
              bgcolor: "secondary.main",
              display: "inline-flex", // umístění obsahu
              // inline = vedle sebe
              // block = pod sebe
              flexDirection: "row",
              color: "white",
              // width: "26%",
              // height: "26%",
              border: 10,
            }}
          >
            <CheckboxTable />
            <CheckboxTable />
            <CheckboxTable />
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            bgcolor: "primary.main",
            color: "black", // barva ohraničení
            height: "50px", // výška
            width: "50px", // šířka
            p: "60px", // (padding) odsazení od obsahu umístěného uvnitř
            //pl: 20,
            flexWrap: "wrap", // zalomí položky, pokud by přetékaly okraj
            border: 10, // ohraničení
            justifyContent: "space-evenly", // vzájemné rozmístění položek uvnitř
            borderRadius: "160px", //zaoblení
            display: "inline-flex",
            flexDirection: "row",
            mb: 10, // (margin) mezera pod boxem
            m: 10, // mezera (obtékání) ze všech stran
            textAlign: "center", //zarovnání textu
            fontSize: 10, // velikost textu
            fontWeight: "bold", //tloušťka písma
            letterSpacing: "3px", // mezery mezi písmeny
          }}
        >
          <Box
            sx={{
              component: "div",
              bgcolor: "secondary.main",
              display: "inline-flex", // umístění obsahu
              // inline = vedle sebe
              // block = pod sebe
              flexDirection: "row",
              color: "white",
              // width: "26%",
              // height: "26%",
              border: 10,
            }}
          >
            <CheckboxTable />
            <CheckboxTable />
            <CheckboxTable />
          </Box>
        </Box>
      </Stack>
      {/* Grid se používá pro vícerozměné rozvržení položek
      xs = mobilní obrazovka
      sm = tablet
      md = PC
      lg = větší monitor
      xl = větší monitor */}
      <Grid
        container
        alignContent={"center"}
        xs={12}
        spacing={0}
        // sx={{
        //   border: "1px solid",
        //   //width: "100%",
        //   display: "flex",
        //   // direction:"row",
        //   // justifyContent: "space-between",
        //   // alignItems:"center"
        // }}
        //direction="column"
        // justifyContent="center"
        // alignItems="center"
      >
        <Grid
          container
          item
          xs={12}
          md={3} //sx={{ margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems:"center"}}
          // direction="row"
          // justifyContent="space-between"
          // alignItems="center"
          justifyContent={"start"}
        >
          <Box
            sx={
              {
                // component: "div",
                // bgcolor: "secondary.main",
                // display: "block", // umístění obsahu
                // // inline = vedle sebe
                // // block = pod sebe
                // flexDirection: "row",
                // color: "white",
                // // width: "26%",
                // // height: "26%",
                // // border: 10,
              }
            }
          >
            <CheckboxTable />
            <CheckboxTable />
            <CheckboxTable />
          </Box>
        </Grid>
        <Grid
          container
          item
          xs={4}
          md={3}
          sx={{ margin: "0 auto" }}
          justifyContent={"start"}
        >
          <Box
            sx={{
              component: "div",
              bgcolor: "secondary.main",
              // display: "inline-flex", // umístění obsahu
              // inline = vedle sebe
              // block = pod sebe
              // flexDirection: "row",
              color: "white",
              // width: "26%",
              // height: "26%",
              // border: 10,
            }}
          >
            <CheckboxTable />
            <CheckboxTable />
            <CheckboxTable />
          </Box>
        </Grid>
        <Grid
          container
          item
          xs={4}
          md={3}
          sx={{ margin: "0 auto" }}
          justifyContent={"center"}
        >
          <Box
            sx={{
              component: "div",
              bgcolor: "secondary.main",
              // display: "inline-flex", // umístění obsahu
              // inline = vedle sebe
              // block = pod sebe
              // flexDirection: "row",
              color: "white",
              // width: "26%",
              // height: "26%",
              // border: 10,
            }}
          >
            <CheckboxTable />
            <CheckboxTable />
            <CheckboxTable />
          </Box>
        </Grid>
        <Grid
          container
          item
          xs={4}
          md={3}
          sx={{ margin: "0 auto" }}
          justifyContent={"center"}
        >
          <Box
            sx={{
              component: "div",
              bgcolor: "secondary.main",
              // display: "inline-flex", // umístění obsahu
              // inline = vedle sebe
              // block = pod sebe
              // flexDirection: "row",
              color: "white",
              // width: "26%",
              // height: "26%",
              // border: 10,
            }}
          >
            <CheckboxTable />
            <CheckboxTable />
            <CheckboxTable />
          </Box>
        </Grid>
      </Grid>
      <Grid container alignContent={"center"} xs={12}>
        <Grid container item xs={6} justifyContent={"start"}>
          <span> content one </span>
        </Grid>
        <Grid container item xs={6} justifyContent={"center"}>
          <span> content two </span>
        </Grid>
      </Grid>

      {/* <Box sx={{ flexGrow: 1 }}> */}
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 4, sm: 12, md: 12 }}
      >
        {Array.from(Array(10)).map((_, index) => (
          <Grid item xs={2} sm={3} md={2} key={index}>
            <CheckboxTable />
          </Grid>
        ))}
      </Grid>
      {/* </Box> */}
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Typography>Item 1</Typography>
        <Typography>Item 2</Typography>
        <Typography>Item 3</Typography>
      </Stack>
    </>
  );}

// NASTUDOVAT ZDE
// https://mui.com/system/properties/