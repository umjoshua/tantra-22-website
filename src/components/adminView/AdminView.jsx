import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import jwt_decode from "jwt-decode";
import AdminNav from '../adminNav/AdminNav';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { CSVLink } from "react-csv";

function AdminView() {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    useEffect(() => {
        setloading(true);
        const fetchData = async () => {
            const response = await Axios.get(url, {
                headers: {
                    'x-auth-token': token
                }
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.status);
                    setStatusAuth(false);
                    localStorage.removeItem("token");
                    window.location.reload();
                }
            })
            const grouped = groupBy(response.data, 'event_id');
            setRegData(grouped);
            setloading(false);
            setindexList(Object.keys(grouped));
        };
        fetchData();
    }, []);

    const [regData, setRegData] = useState(null);
    const [indexList, setindexList] = useState([]);
    const [statusAuth, setStatusAuth] = useState(true);
    const [loading, setloading] = useState(false);

    const token = localStorage.getItem("token");
    let userRole = ""
    try {
        userRole = jwt_decode(token).role;
    }
    catch (error) {
        console.log(error);
    }



    let baseUrl = "https://cautious-waistcoat-mite.cyclic.app/admin/api/";
    let url = baseUrl + "responses";
    console.log(url);
    let branch = "";


    switch (userRole) {
        case "sadmin":
            url = baseUrl + "responses";
            branch = "Super Admin"
            break;
        case "csadmin":
            url = baseUrl + "csresponses";
            branch = "CSE"
            break;
        case "ceadmin":
            url = baseUrl + "ceresponses";
            branch = "CE"
            break;
        case "adsadmin":
            url = baseUrl + "adsresponses";
            branch = "ADS"
            break;
        case "aeiadmin":
            url = baseUrl + "aeiresponses";
            branch = "AEI"
            break;
        case "eceadmin":
            url = baseUrl + "eceresponses";
            branch = "ECE"
            break;
        case "eeeadmin":
            url = baseUrl + "eeeresponses";
            branch = "EEE"
            break;
        case "ashadmin":
            url = baseUrl + "ashresponses";
            branch = "ASH"
            break;
        case "meadmin":
            url = baseUrl + "meresponses";
            branch = "ME";
            break;
        case "commadmin":
            url = baseUrl + "commresponses"
            branch = "Common Events"
            break;
    }


    const Table = ({ data, ind }) => {
        const headers = [
            { label: "Event Name", key: "event_name" },
            { label: "Event Dept", key: "department" },
            { label: "Participant Name", key: "name" },
            { label: "College", key: "college" },
            { label: "Branch", key: "branch" },
            { label: "Sem", key: "semester" },
            { label: "Phone", key: "phno" },
            { label: "email", key: "email" },
            { label: "Transaction ID", key: "tid" },
            { label: "State", key: "stateName" },
            { label: "district", key: "district" },
        ];
        const csvData = data;
        return (
            <div className="flex flex-col">
                <div className='mt-5 bg-white mx-8 pt-5 justify-between flex flex-row'>
                    <p className='font-extrabold '>{data[0].event_name}</p>
                    {<CSVLink data={csvData} headers={headers} filename={`${data[0].event_name}`} className='bg-green-400 font-bold px-2 mx-2 rounded cursor-pointer text-white'><button  >Export Data</button></CSVLink>}
                </div>
                <div className='bg-white mx-8'>
                    <p className='font-extrabold '>Total Registrations: {data.length}</p>
                </div>
                <div className="overflow-x-auto mx-8">
                    <div className="py-2 inline-block min-w-full ">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <TableHeader />
                                <tbody>
                                    {regData[ind].map((item, index) => <TableData props={item} key={index} ind={index} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const TableHeader = () => {
        return (
            <thead className="border-b bg-white">
                <tr>
                    <th>Sl.No</th>
                    <th className='py-5 '>Name</th>
                    <th>College</th>
                    <th>Branch</th>
                    <th>Semester</th>
                    <th>Email</th>
                    <th>Ph No.</th>
                    <th>Transaction ID</th>
                </tr>
            </thead>
        )
    }

    const TableData = ({ props, ind }) => {
        return (
            <tr className="bg-white border-b text-center">
                <td >{ind + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap ">{props.name}</td>
                <td>{props.college}</td>
                <td>{props.branch}</td>
                <td>{props.semester}</td>
                <td>{props.email}</td>
                <td>{props.phno}</td>
                <td>{props.tid}</td>
            </tr>
        )
    }

    function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    return (
        <div>
            {!statusAuth ?
                <div className='bg-white w-screen h-screen items-center flex justify-center flex-col'>
                    <div className='text-red-800 font-extrabold text-2xl'>UnAuthorized Access!!</div>
                    <div>
                        Click
                        <button className='px-5 py-1 bg-teal-400 rounded mx-2' onClick={handleLogout}>Login</button>
                        to Login
                    </div>
                </div> : <AdminNav branch={branch} />}
            {regData != null ? indexList.map((item, index) => <Table data={regData[item]} ind={item} key={index} />)
                : <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>}
        </div>
    )
}

export default AdminView