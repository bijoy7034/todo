import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,

} from '@chakra-ui/react'

const Menu_todo = (props) => {
  const HandleClickComplete = () =>{
    props.filter()
  }
    return ( 
        <div>
            <Menu>
 <MenuButton
    as={IconButton}
    aria-label='Options'
    icon={<FilterAltOutlinedIcon  />}
    variant='outline'
  />
  <MenuList>
    <MenuItem onClick={()=>{props.close()}}>All</MenuItem>
    <MenuItem onClick={()=>{HandleClickComplete()}}>Completed Tasks</MenuItem>
    <MenuItem onClick={()=>{props.filter2()}}>Pending</MenuItem>
  </MenuList>
</Menu>
        </div>
     );
}
 
export default Menu_todo;