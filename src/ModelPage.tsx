import { Close } from '@mui/icons-material';
import { Button, Checkbox, IconButton, InputLabel, ListItem, ListItemText, OutlinedInput, Paper, styled, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import EditableGrid from './EditableGrid';

const defaultValues = {
  method: '',
  parameters: '',
  sampleType: '',
  id: '',
  labName: '',
  location: '',
  contactPerson: '',
  contactNumber: '',
  servicesOffered: null,
  status: '',
}

const schema = yup.object().shape({
  labName: yup.string().trim(),
  location: yup.string().trim(),
  contactPerson: yup.string().trim(),
  contactNumber: yup.string().trim(),
  status: yup.string().trim(),
  method: yup.string().trim(),
  parameters: yup.string().trim(),
  sampleType: yup.string().trim(),
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '90%',
  maxWidth: 1100,
  borderRadius: 2,
  p: 2,
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  opacity: 1,

};

interface KeepMountedModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setEditData: (value: []) => void;
  editData?: {
    labName?: string;
    location?: string;
    contactPerson?: string;
    contactNumber?: string;
    status?: string;
    testMethods?: TestMethod[];
  };
}


interface TestMethod {
  method: string;
  parameters: string[];
  sampleType: string;
}



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 230,
    },
  },
};

const names = [
  'Chemical Analysis',
  'Oil Testing',
  'Water Quality',
  'Material Testing',
  'Environmental Testing',
];


const KeepMountedModal: React.FC<KeepMountedModalProps> = ({ open, setOpen, editData, setEditData }) => {

  console.log(editData);

  const { control, formState, reset, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;


  React.useEffect(() => {
    if (editData)
      reset(
        {
          labName: editData?.labName || '',
          location: editData?.location || '',
          contactPerson: editData?.contactPerson || '',
          contactNumber: editData?.contactNumber || '',
          status: editData?.status || '',
        })

  }, [editData])

  const handleClose = () => {
    setOpen(false)
    setEditData([])
  }

  const onSubmit = (data: any) => {
    console.log(data);

  }

  const testMethod: TestMethod[] = editData?.testMethods || [];

  // {testMethod?.map((item) => {
  //   return (            );
  // })}


  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Modal
          keepMounted
          open={open}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description" >
          <div>
            <Paper className="rounded-xl overflow-scroll h-[calc(55vh-150px)]" sx={style}>
              <div className="flex  mb-8" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" className="font-bold">
                  Edit Mode
                </Typography>
                <Close onClick={handleClose} />
              </div>
              <div>
                <Typography sx={{ fontSize: "20px" }} >
                  Laboratory Details
                </Typography>
                <Grid spacing={8} >
                  <div className='block'>
                    <div className='flex'>
                      <ListItem
                        sx={{ width: "100%", }}
                      >
                        <Controller
                          control={control}
                          name="labName"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Lab Name"
                              id='labName'
                              error={!!errors.labName}
                              helperText={errors.labName?.message}
                            />
                          )}
                        />
                      </ListItem>
                      <ListItem
                        sx={{ width: "100%", }}
                      >
                        <Controller
                          control={control}
                          name="location"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Location"
                              id='location'
                              error={!!errors.labName}
                              helperText={errors.labName?.message}
                            />
                          )}
                        />
                      </ListItem>
                      <ListItem
                        sx={{ width: "100%", }}
                      >
                        <Controller
                          control={control}
                          name="contactPerson"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Contact Person"
                              id='contactPerson'
                              error={!!errors.labName}
                              helperText={errors.labName?.message}
                            />
                          )}
                        />
                      </ListItem>




                    </div>
                    <div className='flex'>
                      <ListItem
                        sx={{ width: "100%", }}
                      >
                        <Controller
                          control={control}
                          name="contactNumber"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Contact Number"
                              id='contactNumber'
                              error={!!errors.labName}
                              helperText={errors.labName?.message}
                            />
                          )}
                        />
                      </ListItem>
                      <ListItem
                        sx={{ width: "100%", }}
                      >
                        <Controller
                          control={control}
                          name="status"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Status"
                              id='Status'
                              error={!!errors.labName}
                              helperText={errors.labName?.message}
                            />
                          )}
                        />
                      </ListItem>
                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <InputLabel id="demo-multiple-checkbox-label">Service Offered</InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {names.map((name) => (
                            <MenuItem
                              key={name} value={name}>
                              <Checkbox checked={personName.includes(name)} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  {/* <div>
                    {
                      testMethod?.map((item) => {

                     return(
                      <div className='block'>
                      <Typography sx={{ fontSize: "20px" }} >
                        Test Methods
                      </Typography>
                      <div className='flex justify-between'>
                        <ListItem>  <TextField
                          id="outlined-password-input"
                          label="Method"
                          autoComplete="current-password"
                          value={editData?.testMethods}
                        />
                        </ListItem>
                        <ListItem>  <TextField
                          id="outlined-password-input"
                          label="Parameters"
                          autoComplete="current-password"
                          value={editData?.labName}
                        />
                        </ListItem>
                        <ListItem>  <TextField
                          id="outlined-password-input"
                          label="sample Type"
                          autoComplete="current-password"
                          value={editData?.labName}
                        />
                        </ListItem>
                      </div>
                    </div>
)

                      })
                    }
                  </div> */}
                  {/* 
                  <div className='mt-5'>
                    <Typography sx={{ fontSize: "20px" }}>Test Methods</Typography>


                    <div>
                      <div className="block" >
                        <div className="flex justify-between">
                          <ListItem
                            sx={{ width: "100%", }}
                          >
                            <Controller
                              control={control}
                              name="method"
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Method"
                                  id='Method'
                                  error={!!errors.method}
                                  helperText={errors.method?.message}

                                />
                              )}
                            />
                          </ListItem>
                          <ListItem
                            sx={{ width: "100%", }}
                          >
                            <Controller
                              control={control}
                              name="parameters"
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Parameters"
                                  id='Parameters'
                                  error={!!errors.parameters}
                                  helperText={errors.parameters?.message}

                                />
                              )}
                            />
                          </ListItem>
                          <ListItem
                            sx={{ width: "100%", }}
                          >
                            <Controller
                              control={control}
                              name="sampleType"
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Sample Type"
                                  id='sampleType'
                                  error={!!errors.sampleType}
                                  helperText={errors.sampleType?.message}

                                />
                              )}
                            />
                          </ListItem>


                        </div>
                      </div>

                    </div>


                  </div> */}

                  <div>
                    <EditableGrid testMethod={editData?.testMethods || []} />
                  </div>

                </Grid>

              </div>
              <ListItem sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color='error' sx={{ paddingX: 2, }} className="rounded mr-10" onClick={() => reset(defaultValues)}>Clear</Button>

                <Button variant="contained" color='info' className="mt-6 rounded" type='submit'>Submit</Button>
              </ListItem>
            </Paper>

          </div>

        </Modal>
      </div>
    </form>
  );
}

export default KeepMountedModal