import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, TextField, Container, Grid2 as Grid } from '@mui/material';
import screws from "../../global/assets/images/screwandbolts.jpeg";
import eyeBolts from "../../global/assets/images/eyebolts.jpg";
import uBolts from "../../global/assets/images/u-bolts.jpg";

const MaterialMaster: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  

  // Handle changes in the description input
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  return (
    <Grid size={12} container spacing={2} alignItems={"center"}>
        <Grid size={4}>
          <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={screws} // Placeholder image URL
                  alt="Placeholder Image"
                  />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Screws and Bolts
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    This is a card that includes an image, a title, and a text description box.
                  </Typography>
                  
                </CardContent>
              </Card>
            </Container>
      </Grid>
      <Grid size={4}>
          <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={eyeBolts} // Placeholder image URL
                  alt="Placeholder Image"
                  />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Eyebolts
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    This is a card that includes an image, a title, and a text description box.
                  </Typography>
                  
                </CardContent>
              </Card>
            </Container>
      </Grid>
      <Grid size={4}>
          <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={uBolts} // Placeholder image URL
                  alt="Placeholder Image"
                  />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    U-Bolts
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    This is a card that includes an image, a title, and a text description box.
                  </Typography>
                  
                </CardContent>
              </Card>
            </Container>
      </Grid>
    </Grid>
    
  );
};

export default MaterialMaster;