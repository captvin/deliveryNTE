import { Modal, Grid, TextField, Select, MenuItem } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/DataTable";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { encryptId } from "middlewares/encription";

import axios from "connection/axios";
import { useEffect, useState } from "react";
import MDTypography from "components/MDTypography";


function Dashboard() {
  const [count, setCount] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [successSB, setSuccessSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const [openModal, setOpenModal] = useState(false); // State untuk mengontrol visibilitas modal

  const handleOpenModal = () => setOpenModal(true); // Fungsi untuk membuka modal
  const handleCloseModal = () => setOpenModal(false);
  // let renderSuccessSB = () => null;

  const listWitel = [
    "DENPASAR",
    "JEMBER",
    "KEDIRI",
    "MADIUN",
    "MADURA",
    "MALANG",
    "NTB",
    "NTT",
    "PASURUAN",
    "SIDOARJO",
    "SINGARAJA",
    "SURABAYA SELATAN",
    "SURABAYA UTARA",
  ];

  let data = {};

  const handleChange = (e) => {
    if (data.hasOwnProperty(e.target.name)) {
      if (data[e.target.value] != e.target.value) {
        data[e.target.name] = e.target.value;
       
      }
    } else {
      data[e.target.name] = e.target.value;
    }
  };

  const renderSuccessSB = () => (
    <MDSnackbar
      color="success"
      icon="check"
      title="Success add Draft"
      content={`Berhasil membuat draft baru`}
      dateTime=""
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const addButton = () => {
    handleOpenModal();
  };

  const fetchData = async () => {
    await axios
      .get("/count")
      .then((res) => setCount(res.data))
      .catch((err) => console.log("error"));

    await axios
      .get("/getAll")
      .then((res) => setDataTable(res.data))
      .catch((err) => console.log("error"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/createDraft", data).then(async (response) => {
      handleCloseModal();
      openSuccessSB();
      setTimeout(() => {
        closeSuccessSB();
        fetchData();
      }, 2000);
    });
  };

  useEffect(() => {
    fetchData();

    Promise.all([fetchData()]);
  }, []);

  const columns = [
    { Header: "Nomor Order", accessor: "nomorOrder" },
    { Header: "Witel", accessor: "witel" },
    { Header: "Tanggal", accessor: "reqDate" },
    { Header: "Pelanggan", accessor: "namaPelanggan" },
    { Header: "Drafter", accessor: "drafter" },
    { Header: "OMS", accessor: "noOMS" },
    { Header: "Status", accessor: "status" },
    { Header: "Action", accessor: "action" },
  ];

  const rows = dataTable.map((data, index) => ({
    nomorOrder: data.nomorOrder,
    reqDate: `${new Date(data.reqDate).getFullYear()}-${(new Date(data.reqDate).getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date(data.reqDate).getDate().toString().padStart(2, "0")} ${new Date(
        data.reqDate
      )
        .getHours()
        .toString()
        .padStart(2, "0")}:${new Date(data.reqDate)
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${new Date(data.reqDate).getSeconds().toString().padStart(2, "0")}`,
    namaPelanggan: data.namaPelanggan,
    witel: data.witel,
    drafter: data.drafter,
    noOMS: data.noOMS,
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={data.status}
          color={
            data.status === "installed"
              ? "success"
              : data.status === "delivered"
                ? "info"
                : data.status === "onDelivery"
                  ? "warning"
                  : data.status === "draft"
                    ? "dark"
                    : data.status === "declined"
                      ? "error"
                      : ""
          }
        />
      </MDBox>
    ),
    action: (
      <MDBox ml={-1}>
        <MDButton variant="contained" color="info" href={"/detail?id=" + encryptId(`${data.id}`)}>
          Detail
        </MDButton>
      </MDBox>
    ),
  }));

  // Definisikan properti untuk DataTable
  const dataTableProps = {
    entriesPerPage: { defaultValue: 5, entries: [5, 10, 15, 20, 25] },
    canSearch: true,
    showTotalEntries: true,
    table: { columns, rows },
    pagination: { variant: "gradient", color: "info" },
    isSorted: true,
    noEndBorder: false,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard color="dark" icon="edit" title="Draft" count={count.draft} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="local_shipping"
                color="warning"
                title="On Delivery"
                count={count.on_delivery}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                // color="success"
                icon="inventory2"
                title="Delivered"
                count={count.delivered}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="check_circle"
                title="Installed"
                count={count.installed}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container justifyContent="flex-end" mb={2}>
            <Grid item>
              <MDButton variant="contained" onClick={addButton} color="primary">
                New Draft
              </MDButton>
            </Grid>
          </Grid>
          {/* <MDButton variant="contained" color="primary">Open Modal</MDButton> */}
          <Table {...dataTableProps} />
        </MDBox>
      </MDBox>
      {renderSuccessSB()}
      <Footer />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <MDBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <MDTypography variant="h3" fontWeight="medium">
            New Draft
          </MDTypography>
          <form fullWidth required mb={2} onSubmit={handleSubmit}>
            <MDTypography variant="h6">Tanggal</MDTypography>
            <TextField
              name="tanggal"
              type="datetime-local"
              fullWidth
              // value={formValues.arrivedDate}
              onChange={handleChange}
              required
              mb={2}
            />
            <MDTypography variant="h6">Witel</MDTypography>
            <Select name="witel" label="Witel" fullWidth onChange={handleChange} required mb={2}>
              {listWitel.map((data, index) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
            <MDTypography variant="h6">Nomor Order</MDTypography>
            <TextField
              name="nomorOrder"
              label="Nomor Order"
              fullWidth
              // value={formValues.panjangSFP}
              onChange={handleChange}
              required
              mb={2}
            />
            <MDTypography variant="h6">Nama Pelanggan</MDTypography>
            <TextField
              name="namaPelanggan"
              label="Nama Pelanggan"
              fullWidth
              // value={formValues.panjangSFP}
              onChange={handleChange}
              required
              mb={2}
            />
            <MDTypography variant="h6">Drafter</MDTypography>
            <TextField
              name="drafter"
              label="Drafter"
              fullWidth
              // value={formValues.panjangSFP}
              onChange={handleChange}
              required
              mb={2}
            />
            <MDTypography variant="h6">Nomor OMS</MDTypography>
            <TextField
              name="noOMS"
              label="Nomor OMS"
              fullWidth
              // value={formValues.panjangSFP}
              onChange={handleChange}
              required
              mb={2}
            />
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                submit
              </MDButton>
            </MDBox>
          </form>
        </MDBox>
      </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;
