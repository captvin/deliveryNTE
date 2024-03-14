import { Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import axios from 'connection/axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useEffect, useState } from "react";
import { decryptId } from 'middlewares/encription';
import MDBadge from 'components/MDBadge';
import MDBox from 'components/MDBox';


function Detail() {
    const [data, setData] = useState([])

    const params = new URLSearchParams(window.location.search);
    // console.log(params.get('id').replace(/\s/g, '+'))
    const lockId = params.get('id').replace(/\s/g, '+')
    const id = decryptId(lockId);
    // const id = decryptId("U2FsdGVkX1%2FzneFsRI19A8ZItpqdjWf1nEY7drMk%20aQ%3D");
    // console.log(id)
    const body = {
        id: id
    }

    useEffect(() => {

        const getData = async () => {
            await axios
                .post('/findById', body)
                .then((res) => setData(res.data))
        }

        Promise.all([getData()])
    }, [])

    // console.log(data)

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Detail Delivery
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Nomor Order: {data.nomorOrder}
                                    </Typography>
                                    <MDBox mt={1.5}>
                                        <Typography variant="h5" component="div">
                                            DRAFT
                                        </Typography>
                                        <Typography variant="subtitle2" component="div">
                                            Tanggal Draft: {new Date(data.reqDate).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Witel: {data.witel}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Pelanggan: {data.namaPelanggan}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Drafter: {data.drafter}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Nomor OMS: {data.noOMS}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Submit (PED): <MDBadge badgeContent={data.submit ? data.submit : 'waiting'} color={data.submit === 'OK' ? "success" : data.submit === 'NOK' ? 'danger' : data.submit === null ? 'warning' : ''} />
                                        </Typography>
                                    </MDBox>
                                    {/* <MDBox mt={1}> */}
                                    {/* <Typography variant="subtitle2">
                                    Submit (PED): <MDBadge badgeContent={data.submit ? data.submit : 'waiting'} color={data.submit === 'OK' ? "success" : data.submit === 'NOK' ? 'danger' : data.submit === null ? 'warning' : ''} />
                                </Typography> */}
                                    {/* </MDBox> */}

                                    {data.arrivedDate ? (
                                        <MDBox mt={1.5}>
                                            <Typography variant="h5">
                                                KEDATANGAN
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                Tanggal Kedatangan: {new Date(data.arrivedDate).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                Penerima: {data.namaPenerima}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                Merk: {data.merk}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                type: {data.type}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                Serial Number: {data.SN}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                MAC address: {data.MACaddress}
                                            </Typography>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                SFP :
                                            </Typography>
                                            <MDBox sx={{ marginLeft: 2 }}>
                                                <Typography variant="subtitle2">
                                                    Merk: {data.sfp.merk}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    Jenis: {data.sfp.jenis}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    Kapasitas: {data.sfp.kapasitas}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    Panjang: {data.sfp.panjang}Km
                                                </Typography>
                                            </MDBox>
                                        </MDBox>
                                    ) : ''}
                                    {data.OLT ? (
                                        <MDBox mt={1.5}>
                                            <Typography variant="h5">
                                                INSTALASI
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                OLT: {data.OLT}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                IP OLT: {data.IP_OLT}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                Port: {data.port}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                IP L2 Switch: {data.IP_L2Switch}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                Hostname: {data.hostname}
                                            </Typography>
                                        </MDBox>
                                    ) : ''}


                                    {/* Tambahkan komponen Typography untuk menampilkan detail data lainnya */}
                                </CardContent>
                            </Grid>
                            <Grid item xs={4}>
                                {data.installed_evidence ? (
                                    <CardMedia
                                    component="img"
                                    // height="400"
                                    image={"http://localhost:8080/image/" + data.installed_evidence} // Ganti dengan properti foto dari data
                                    alt="Foto"
                                />
                                ) : ''}
                                
                            </Grid>
                        </Grid>


                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

export default Detail;