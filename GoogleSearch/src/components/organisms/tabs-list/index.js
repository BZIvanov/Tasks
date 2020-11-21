import { ContentTabs } from '../../molecules';
import { Box } from '../../atoms';
import { useStyles } from './styles';

const TabsList = () => {
  const classes = useStyles();

  return (
    <Box className={classes.tabs}>
      <ContentTabs
        value={0}
        titles={['All', 'Images', 'News', 'Videos', 'More']}
      />
      <ContentTabs value={0} titles={['Settings', 'Tools']} simple />
    </Box>
  );
};

export default TabsList;
