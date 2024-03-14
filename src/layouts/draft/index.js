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


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/DataTable"

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components

import { encryptId } from "middlewares/encription";

import axios from 'connection/axios'
import { useEffect, useState } from "react";
// import MDBadge from "components/MDBadge";
// import Tables from "layouts/tables";

function Dashboard() {
    const { sales, tasks } = reportsLineChartData;
    const [dataTable, setDataTable] = useState([])
    const [successSB, setSuccessSB] = useState(false);

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);

    const buttonOK = (id) => {
        const data = { id, submit: 'OK' }
        axios.patch('/submit', data)
            .then((response) => {
                openSuccessSB()
            })
    }

    const buttonNOK = (id) => {
        const data = { id, submit: 'NOK' }
        axios.patch('/submit', data)
            .then((response) => {
                openSuccessSB()
            })
    }

    const renderSuccessSB = (nomorOrder) => (
        <MDSnackbar
            color="success"
            icon="check"
            title="Success Submit"
            content={`Status submit order dengan nomor ${nomorOrder} telah berhasil`}
            dateTime="11 mins ago"
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            bgWhite
        />
    );

    useEffect(() => {

        const getData = async () => {
            await axios
                .get('/getDraft')
                .then((res) => setDataTable(res.data))
                .catch((err) => console.log("error"))
        }

        Promise.all([getData()])
    }, [])




    const columns = [
        { Header: 'Nomor Order', accessor: 'nomorOrder' },
        { Header: 'Witel', accessor: 'witel' },
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
                    OK
                </MDButton>
                {renderSuccessSB(data.nomorOrder)}
                <MDButton variant="contained" color="error" onClick={() => buttonNOK(data.id)}>
                    NOK
                </MDButton>
                <MDButton
                    variant="contained"
                    color="info"
                    href={"/detail?id=" + encryptId(`${data.id}`)}
                >
                    Detail
                </MDButton>
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
        </DashboardLayout>
    );
}

export default Dashboard;
