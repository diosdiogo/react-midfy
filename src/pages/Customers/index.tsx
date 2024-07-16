import { Alert, 
         Box, 
         Button, 
         Container, 
         createTheme, 
         CssBaseline, 
         Dialog, 
         DialogContent, 
         DialogTitle, 
         Grid, 
         IconButton, 
         Paper, 
         TextField, 
         ThemeProvider, Toolbar } from "@mui/material";
import Bar from "../../components/Bar";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useState } from "react";
import { customersColumns, CustomersData } from "../../interface/ICustomers";
import { CustomersService } from "../../services/CustomersService";
import TabelComponet from "../../components/TableComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

const defaultTheme = createTheme();

interface FormSearchValues {
  id: number | '';
  name: string;
  date: string;
}
type TAlert = {
  type: "success" | "error";
  message: string;
  isOpen: Boolean;
}

const validationCustemers = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
});

export default function Customers() {
  const initialSearch: FormSearchValues = { id: '', name: '', date: '' };
  const [initialEdit, setInitialEdit] = useState<CustomersData>({
    id: 0,
    name: '',
    createdAt: '',
    avatar: '',
  });
  const [custmers, setCustomers] = useState<CustomersData[]>([])
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<TAlert>({
    type: 'success',
    message: 'sucesso',
    isOpen: false,
  })
  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  function handleEdit(row: CustomersData): void {
    setOpen(true);
    setInitialEdit({
      id: row.id,
      name: row.name,
      createdAt: row.createdAt,
      avatar: row.avatar
    });
  }

  const handleClose = () => {
    setOpen(false);
  };

  const columnsActions = customersColumns.map((column) => {
    if (column.field === 'action') {
      return {
        ...column,
        renderCell: (params: any) => (
          <div>
              <IconButton  onClick={() => handleEdit(params.row)} color="primary" aria-label="Editar">
                  <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.row.id)} color="secondary" aria-label="Delete">
                  <DeleteIcon />
              </IconButton>
          </div>
        ),
      }
    }
    return column;
  })
  const pesquisar = useMemo(() => {
    return console.log();
  }, [custmers])
  
  const atualizar = async () => {
    CustomersService.customersGetAll()
    .then((response) => {
      if (response instanceof Error) {
        setAlert({
          type: 'error',
          message: response.message,
          isOpen: false,
        })
        return
      }
      setCustomers(response.data)
    })
  }
  useEffect(() => {
    atualizar()
  }, [])

  
  const handleSubmit = async (value: CustomersData) => {
    try {
      CustomersService.updateCustomer(value.id, value)
      .then((response) => {
        if (response instanceof Error) {
          setAlert({
            type: 'error',
            message: response.message,
            isOpen: false,
          })
          return
        }
        atualizar()
        handleClose()
      })
    } catch (error) {
      console.error('Erro ao enviar os dados para a API:', error);
    }
  };

  function handleDelete(id: number): void {
    try {
      CustomersService.deleteCustomer(id)
      .then((response) => {
        if (response instanceof Error) {
          setAlert({
            type: 'error',
            message: response.message,
            isOpen: false,
          })
          return
        }
        atualizar()
        handleClose()
      })
    } catch (error) {
      console.error('Erro ao enviar os dados para a API:', error);
    }
  }
    return (
      <ThemeProvider theme={defaultTheme}>
        {alert.isOpen && (
          <Alert 
            severity={(alert && alert.type) || 'success'}
            onClose={handleCloseAlert}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 9999,
            }}
          >
            {alert && alert.message}
          </Alert>
        )}
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Bar namePage="Clientes"/>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
              <Grid container maxWidth="lg" spacing={2}>
                <Formik 
                  initialValues={initialSearch}
                  onSubmit={(values) => {
                    console.log(values);
                }}> 
                {({ handleChange, values }) => (
                  <Form style={{ width: '100%'}}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 140,
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4} lg={2}>
                          <TextField 
                            id="id" 
                            name="id"
                            label="Código" 
                            variant="outlined"
                            value={values.id}
                            onChange={(e) => {
                              const { value } = e.target;
                              const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
                              handleChange({
                                target: {
                                  name: 'id',
                                  value: numericValue,
                                },
                              });
                            }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={4} lg={8}>
                          <TextField 
                            id="name" 
                            label="Nome" 
                            variant="outlined"
                            value={values.name}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} md={4} lg={2} sx={{ display: 'flex' }} justifyContent="flex-end">
                          <Button variant="contained" endIcon={<SearchIcon />}>
                            Pesquisar
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Form>
                )}
                </Formik>
              </Grid>
            </Container>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
              <Grid container maxWidth="lg" spacing={2}>
                <TabelComponet
                  columns={columnsActions} 
                  data={custmers} 
                />
              </Grid>
            </Container>
            {/* Modal editar */}

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Editar Cliente
              </DialogTitle>
              <DialogContent>
                <Formik 
                  initialValues={initialEdit} 
                  validationSchema={validationCustemers} 
                  onSubmit={handleSubmit}
                  >
                   {({ errors, touched, handleChange, isValid, values }) => (
                    <Form style={{ width: '100%'}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4} lg={2}>
                          <TextField 
                            id="id" 
                            name="id"
                            label="Código" 
                            variant="outlined"
                            value={values.id}
                            InputProps={{
                              readOnly: true,
                            }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={4} lg={8}>
                          <TextField
                            id="name"
                            name="name"
                            label="Nome"
                            variant="outlined"
                            value={values.name}
                            onChange={handleChange}
                            fullWidth
                          />
                          <ErrorMessage name="name" component="div" />
                        </Grid>
                        <Grid item xs={12} md={4} lg={2} sx={{ display: 'flex' }} justifyContent="flex-end">
                          <Button
                            type="submit"
                            variant="contained"
                            >
                            Salvar
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </DialogContent>
            </Dialog>
          </Box>
        </Box>
      </ThemeProvider>
    )
}