import React from 'react';
import { Drawer, Divider, Typography } from '@material-ui/core';

const SettingsDrawer = ({visible, onClose}) => {
  return (
    <Drawer style={{ maxWidth: '40vw' }} anchor="left" open={visible} onClose={onClose}>
      <Typography variant="body1">
        Subscribii - A Subscriptions Management Tool
      </Typography>
      <Divider />
      <Typography variant="caption">
        Copyright &copy; Shreyas Tallamraju 2020. All Rights Reserved.
      </Typography>
    </Drawer>
  );
}

export default SettingsDrawer;