const AddCustomerDialog = ({ open, onClose, onAddCustomer }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    const handleAdd = () => {
      onAddCustomer({ name, email });
      setName('');
      setEmail('');
      onClose();
    };


  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new customer, please enter their name and email address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };