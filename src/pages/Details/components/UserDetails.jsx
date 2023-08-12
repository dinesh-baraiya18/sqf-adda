import React, { useState, useEffect } from 'react'
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  Typography,
  Box,
  Pagination,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import axios from 'axios'

const dbUrl = 'https://squarefoot-adda-default-rtdb.firebaseio.com/'
// const dbUrl = 'https://sqf-adda-1876c-default-rtdb.firebaseio.com/'

const UserDetails = () => {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${dbUrl}/userdata.json`)
      if (response.data) {
        const fetchedData = Object.values(response.data)
        setUserData(fetchedData.reverse())
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userData])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = userData.slice(startIndex, endIndex)

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          minHeight: '50vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4">Loading...</Typography>
      </Box>
    )
  }

  const totalPages = Math.ceil(userData.length / itemsPerPage)

  return (
    <section className="table-data pt pb" sx={{ marginTop: '80px' }}>
      <Container>
        <Box className="pt">
          <Box
            gap={20}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            borderBottom="1px solid #ddd"
            marginBottom={'30px'}
          >
            <Typography variant="h4" component="h4" mb={2} color="#ff5a3c">
              User
            </Typography>
            <Typography variant="h5" component="h5" mb={2} color="#ff5a3c">
              {`Total: ${userData.length}`}
            </Typography>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: '0px 0px 20px #e9e9e9 !important',
            }}
          >
            <Table sx={{ whiteSpace: 'nowrap' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#ff5a3c', fontWeight: '600' }}>
                    Sr
                  </TableCell>
                  <TableCell sx={{ color: '#ff5a3c', fontWeight: '600' }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: '#ff5a3c', fontWeight: '600' }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ color: '#ff5a3c', fontWeight: '600' }}>
                    Phone
                  </TableCell>
                  <TableCell sx={{ color: '#ff5a3c', fontWeight: '600' }}>
                    Receive Call
                  </TableCell>
                  <TableCell sx={{ color: '#ff5a3c', fontWeight: '600' }}>
                    Project Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map(
                  ({ name, email, phone, agree, projectName }, index) => (
                    <TableRow key={index}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{phone}</TableCell>
                      <TableCell>
                        {agree ? (
                          <CheckCircleIcon style={{ color: 'green' }} />
                        ) : (
                          <CancelIcon style={{ color: 'red' }} />
                        )}
                      </TableCell>
                      <TableCell>{projectName}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          className="pagination"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '50px',
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </section>
  )
}

export default UserDetails
