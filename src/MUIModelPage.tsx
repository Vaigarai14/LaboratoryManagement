import React, { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const centeredStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface MUiModelPage {
    open: boolean;
  }



    const MUiModelPage: React.FC<MUiModelPage> = ({ open }) => {
//   const [modal1Open, setModal1Open] = useState(false);
//   const [modal2Open, setModal2Open] = useState(false);

  return (
    <>


      {/* Button for the second modal */}
      <Button variant="contained" color="primary" 
    //   onClick={() => setModal2Open(true)}
      >
        Vertically centered modal dialog
      </Button>
      <Modal
        open={open}
        // onClose={() => setModal2Open(false)}
        aria-labelledby="modal-title-2"
        aria-describedby="modal-description-2"
      >
        <Box sx={centeredStyle}>
          <Typography id="modal-title-2" variant="h6" component="h2">
            Vertically centered modal dialog
          </Typography>
          <Typography id="modal-description-2" sx={{ mt: 2 }}>
            <p>some contents...</p>

          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default MUiModelPage;
