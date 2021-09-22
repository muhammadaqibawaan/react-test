import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { DatePicker, Space, Input } from "antd";
import { Select, Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { AudioOutlined, MoreOutlined } from "@ant-design/icons";
import { Drawer, Button } from "antd";
import * as patientActions from '../../store/actions/Patient';
// import { RadioChangeEvent } from "antd/es/radio";

const { Option } = Select;
export default function Dashboard() {
  const dispatch = useDispatch();
  const patients = useSelector(state => state.pat.patients);
  const [patientDetail, setPatientDetail] = useState(null);
  const [visible, setVisible] = useState(false);

  const showDrawer = tokenno => {
    setVisible(true);
    setPatientDetail(patients.find(x => x.tokenno == tokenno));
  };

  const onClose = () => {
    setVisible(false);
  };

  const dataSource = patients;

  const columns = [
    {
      title: '',
      dataIndex: 'tokenno',
      render: data => {
        return (
          <img
            src={patients.find(x => x.tokenno == data).userImage}
            alt=''
            style={{ width: '20px', borderRadius: '10px' }}
          />
        );
      },
    },
    {
      title: 'Token NO',
      dataIndex: 'tokenno',
      key: 'token no',
    },
    {
      title: 'MR no',
      dataIndex: 'mrNo',
      key: 'mr no',
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'p.name',
    },
    {
      title: 'Apt time',
      dataIndex: 'aptTime',
      key: 'a.time',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Arrival time',
      dataIndex: 'arrivalTime',
      key: 'arrival time',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Assess time',
      dataIndex: 'assessTime',
      key: 'assess time',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Seen time',
      dataIndex: 'seenTime',
      key: 'seen time',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => <p className='invite'>{text} </p>,
    },
    {
      title: '',
      dataIndex: 'tokenno',
      render: tokenno => (
        <p className='invite' onClick={() => showDrawer(tokenno)}>
          View{' '}
        </p>
      ),
    },
  ];
  useEffect(() => {
    const fetchPatients = async () =>{
     try {
       await dispatch(patientActions.fetchPatients());
     } catch (error) {
     }
    }
    fetchPatients();
  }, [])
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  return (
    <div className='dashbaord'>
      <Drawer
        title='Profile'
        placement={'right'}
        width={500}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type='primary' onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <div className='d-flex '>
          <div className='mr-30'>
            <div className='drawer-photo'>
              <UserOutlined />
            </div>
          </div>
          <div className='user-info'>
            <p>
              <b>{patientDetail && patientDetail.patientName}</b>
            </p>
            <p>
              MR No: <b>{patientDetail && patientDetail.tokenno}</b>
            </p>
            <p>
              Age: <b>{patientDetail && patientDetail.age}</b>
            </p>
          </div>
        </div>
        <div className='userplace'>
          <p>
            Registraion Date{' '}
            <span style={{ textAlign: 'right', float: 'right' }}>
              {patientDetail && patientDetail.registrationDate}
            </span>
          </p>
          <p>
            Date of Birth{' '}
            <span style={{ textAlign: 'right', float: 'right' }}>
              {patientDetail && patientDetail.dob}
            </span>
          </p>
          <p>
            Blood Group{' '}
            <span style={{ textAlign: 'right', float: 'right' }}>
              {patientDetail && patientDetail.bloodGroup}
            </span>
          </p>
          <p>
            Miarial Status{' '}
            <span style={{ textAlign: 'right', float: 'right' }}>
              {patientDetail && patientDetail.marial_status}
            </span>
          </p>
          <p>
            Religion{' '}
            <span style={{ textAlign: 'right', float: 'right' }}>
              {patientDetail && patientDetail.religion}
            </span>
          </p>
          <p>
            Address{' '}
            <span style={{ textAlign: 'right', float: 'right' }}>
              {patientDetail && patientDetail.address}
            </span>
          </p>
        </div>
        <div className='p-2 d-flex align-items-center'>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Drawer>
      <div className='topbar'>
        <div>
          <div className='d-flex'>
            <img
              src={logo}
              alt=''
              style={{ width: '40px', height: '35px', borderRadius: '50%' }}
            />
            <div>
              <p style={{ margin: '0px', marginLeft: '5px' }}>
                <b>Shifa</b>
              </p>
              <small>
                <b>International Hospital limited</b>
              </small>
            </div>
          </div>
        </div>
        <div className='right'>
          <Select defaultValue='lucy' style={{ width: 120, margin: '0px 6px' }}>
            <Option value='jack'>Jack</Option>
            <Option value='lucy'>Lucy</Option>
          </Select>
          <DatePicker style={{ margin: '0px 6px' }} />

          <div className='create'>Create New Visit</div>
          <div className='search'>Search patient</div>
          <div className='token'>
            <p className='no-oftoken'>1</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>Next</p>
              <p>token no</p>
            </div>
          </div>
          <UserOutlined className='user-profile' />
        </div>
      </div>
      <div className='table-container'>
        <div className='table-filter'>
          <div>
            <p>OPD Appointment list</p>
          </div>
          <div className='d-flex align-items-center'>
            <p style={{ margin: '0px' }}>
              <b>Safe Ehsan | NR</b>
            </p>
            <Select
              defaultValue='lucy'
              style={{ width: 150, margin: '0px 8px' }}
            >
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
            </Select>
            <Search
              placeholder='input search text'
              onSearch={onSearch => {}}
              style={{ width: 150, margin: '0px 8px' }}
            />
          </div>
        </div>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
}
