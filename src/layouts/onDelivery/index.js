/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";



// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import { Modal, Box, TextField, MenuItem, Select} from "@mui/material"

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/DataTable"
import { encryptId } from "middlewares/encription";

import axios from 'connection/axios'
import { useEffect, useState } from "react";


function Dashboard() {
    const [dataTable, setDataTable] = useState([])
    const [successSB, setSuccessSB] = useState(false);
    const [modalContent, setModalContent] = useState(<MDBox></MDBox>)
    let [formValues, setFormValues] = useState({
        // arrivedDate: '',
        // namaPenerima: '',
        // merk: '',
        // type: '',
        // SN: '',
        // MACaddress: '',
        // merkSFP: '',
        // jenisSFP: '',
        // kapasitasSFP: '',
        // panjangSFP: ''
    })

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);

    const [openModal, setOpenModal] = useState(false); // State untuk mengontrol visibilitas modal

    const handleOpenModal = () => setOpenModal(true); // Fungsi untuk membuka modal
    const handleCloseModal = () => setOpenModal(false);


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.patch('/delivered', data)
            .then(async (response) => {
                handleCloseModal();
                openSuccessSB();
                // fetchData();
                setTimeout(() => {
                    closeSuccessSB();
                    fetchData();
                }, 2000);

            })
        // console.log(data)
    }

    const fetchData = async () => {
        await axios
            .get('/onDelivery')
            .then((res) => setDataTable(res.data))
            .catch((err) => console.log("error"))
    }

    let data = {}

    const handleChange = (e) => {
        if (data.hasOwnProperty(e.target.name)) {
            if (data[e.target.value] != e.target.value) {
                data[e.target.name] = e.target.value
            }
        }
        else {
            data[e.target.name] = e.target.value
        }
    };


    const buttonOK = (id) => {
        // const data = { id, submit: 'OK' }
        // axios.patch('/submit', data)
        //     .then((response) => {
        //         openSuccessSB()
        //     })
        data.id = id
        setModalContent(
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                // width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <MDTypography variant="h3" fontWeight="medium">Input Kedatangan Barang </MDTypography>
                <form fullWidth required mb={2} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <MDTypography variant="h6">Tanggal Kedatangan</MDTypography>
                            <TextField
                                name="arrivedDate"
                                type="datetime-local"
                                fullWidth
                                value={formValues.arrivedDate}
                                onChange={handleChange}
                                required
                                mb={2}
                            />
                            <MDTypography variant="h6">Nama Penerima</MDTypography>
                            <TextField
                                name="namaPenerima"
                                label="Nama Penerima"
                                fullwidth
                                value={formValues.namaPenerima}
                                onChange={handleChange}
                                required
                                mb={2}
                            />
                            <MDTypography variant="h6">Merk</MDTypography>
                            <TextField
                                name="merk"
                                label="Merk"
                                fullWidth
                                value={formValues.merk}
                                onChange={handleChange}
                                required
                                mb={2}
                            />
                            <MDTypography variant="h6">Type</MDTypography>
                            <TextField
                                name="type"
                                label="Type"
                                fullWidth
                                value={formValues.type}
                                onChange={handleChange}
                                required
                                mb={2}
                            />
                            <MDTypography variant="h6">Serial Number</MDTypography>
                            <TextField
                                name="SN"
                                label="Serial Number"
                                fullWidth
                                value={formValues.SN}
                                onChange={handleChange}
                                required
                                mb={2}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MDTypography variant="h6">MAC address</MDTypography>
                            <TextField
                                name="MACaddress"
                                label="MAC Address"
                                fullWidth
                                value={formValues.MACaddress}
                                onChange={handleChange}
                                required
                                mb={2}
                            />
                            <MDTypography variant="h6">Merk SFP</MDTypography>
                            <TextField
                                name="merkSFP"
                                label="Merk SFP"
                                fullWidth
                                value={formValues.merkSFP}
                                onChange={handleChange}
                                required
                                mb={2}
                            />
                            <MDTypography variant="h6">Jenis SFP</MDTypography>
                            <Select
                                name="jenisSFP"
                                label="Jenis SFP"
                                fullWidth
                                value={formValues.jenisSFP}
                                onChange={handleChange}
                                required
                            // mb={2}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="electrical">Electrical</MenuItem>
                                <MenuItem value="optical">Optical</MenuItem>
                            </Select>
                            <MDTypography variant="h6">Kapasitas SFP</MDTypography>
                            <Select
                                name="kapasitasSFP"
                                label="Kapasitas SFP"

                                fullWidth
                                // sx={{ width: '100%' }}
                                value={formValues.kapasitasSFP}
                                onChange={handleChange}
                                required
                            // mb={2}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="1G">1G</MenuItem>
                                <MenuItem value="10G">10G</MenuItem>
                            </Select>
                            <MDTypography variant="h6">Panjang SFP</MDTypography>
                            <TextField
                                type="number"
                                name="panjangSFP"
                                label="KM"
                                fullWidth
                                value={formValues.panjangSFP}
                                onChange={handleChange}
                                required
                                mb={2}
                            />
                        </Grid>
                    </Grid>

                    <MDBox mt={4} mb={1}>
                        <MDButton variant="gradient" color="info" fullWidth type="submit">
                            submit
                        </MDButton>
                    </MDBox>
                </form>
            </Box>
        )
        handleOpenModal()
    }




    const renderSuccessSB = (nomorOrder) => (
        <MDSnackbar
            color="success"
            icon="check"
            title="Success Change to Delivered"
            content={`Status submit order dengan nomor ${nomorOrder} telah berhasil`}
            dateTime=""
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            bgWhite
        />
    );


    useEffect(() => {

        fetchData()

        Promise.all([fetchData()])
    }, [])

    const columns = [
        { Header: 'Nomor Order', accessor: 'nomorOrder' },
        { Header: 'witel', accessor: 'witel' },
        { Header: 'Tanggal', accessor: 'reqDate' },
        { Header: 'Pelanggan', accessor: 'namaPelanggan' },
        { Header: 'Drafter', accessor: 'drafter' },
        { Header: 'OMS', accessor: 'noOMS' },
        { Header: 'Actiton', accessor: 'action' },
    ];

    const rows = dataTable.map((data, index) => ({
        nomorOrder: data.nomorOrder,
        reqDate: `${new Date(data.reqDate).getFullYear()}-${(new Date(data.reqDate).getMonth() + 1).toString().padStart(2, '0')}-${new Date(data.reqDate).getDate().toString().padStart(2, '0')} ${new Date(data.reqDate).getHours().toString().padStart(2, '0')}:${new Date(data.reqDate).getMinutes().toString().padStart(2, '0')}:${new Date(data.reqDate).getSeconds().toString().padStart(2, '0')}`,
        namaPelanggan: data.namaPelanggan,
        witel: data.witel,
        drafter: data.drafter,
        noOMS: data.noOMS,
        action: (
            <MDBox>
                <MDButton variant="contained" color="success" onClick={() => buttonOK(data.id)}>
                    Delivered
                </MDButton>
                {renderSuccessSB(data.nomorOrder)}
                <MDButton
                    variant="contained"
                    color="info"
                    href={"/detail?id=" + encryptId(`${data.id}`)}
                >
                    Detail
                </MDButton>
                {/* {renderModal(data.id, data.nomorOrder)} */}
            </MDBox>


        )

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

                <MDBox>
                    <Table
                        {...dataTableProps}
                    />
                </MDBox>
            </MDBox>
            <Footer />
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {modalContent}
                {/* <MDBox></MDBox> */}
            </Modal>
        </DashboardLayout>

    );
}

export default Dashboard;
