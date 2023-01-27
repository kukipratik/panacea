import React, { useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Drawer,
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MyDrawer = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <React.Fragment>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <Box sx={{ minWidth: '250px', maxHeight: "auto" }}>
                    <List>
                        <ListItem>
                            <ListItemButton href="/">
                                <ListItemText primary="Market Place" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton href="" >
                                <ListItemText primary="Solutions" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton href="/">
                                <ListItemText primary="Blog" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton href="/">
                                <ListItemText primary="Items" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton href="/">
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Button variant="text" onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon style={{ color: 'balck' }} />
            </Button>
        </React.Fragment>
    );
};

export default MyDrawer;
