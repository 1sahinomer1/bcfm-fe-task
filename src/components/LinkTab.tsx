import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

type LinkTabProps = {
  label: string;
  href: string;
};

const LinkTab = (props: LinkTabProps) => {
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event: any) => {
        event.preventDefault();
        navigate(props.href);
      }}
      {...props}
    />
  );
};

export default LinkTab;
