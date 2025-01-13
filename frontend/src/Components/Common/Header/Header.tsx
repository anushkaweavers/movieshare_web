"use client";

import {
  Box,
  Container,
  Divider,
  Drawer,
  Grid2,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/Redux/store";
import Cookies from "universal-cookie";
import { userLogout } from "@/Redux/Auth/user.slice";
import { publicRoutes } from "@/Routes/public.routes";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { RootState } from "@/Redux/store";
import ButtonField from "../UiComps/ButtonField";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | HTMLLIElement | null>(
    null
  );

  const handleClick = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLLIElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileopen = Boolean(anchorEl);
  const id = profileopen ? "user-profile-popover" : undefined;

  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);
  // const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const gotoMovie = () => {
    router.push("/movies/list");
  };
  const gotoSearchMovie = () => {
    router.push("/movies/search");
  };

  useEffect(() => {
    if (!cookies.get("access_token")) {
      dispatch(userLogout());
    }
  }, []);
  const handleLogout = () => {
    dispatch(userLogout());
    router.push("/");
  };
  const DrawerList = (
    <Box
      className='mobile-sidebar'
      sx={{ width: 302 }}
      role='presentation'
      onClick={() => {
        toggleDrawer(false);
      }}
    >
      <List className='menu-each-block'>
        <p>MOVIES</p>
        <ListItemButton>
          <ListItemIcon>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M17.3847 15.5541V8.69141H15.5547V15.5541C15.5547 17.8417 17.3847 19.6717 19.6723 19.6717V17.8417C18.3913 17.8417 17.3847 16.8351 17.3847 15.5541Z' />
              <path d='M8.69273 17.3855C13.4936 17.3855 17.3855 13.4936 17.3855 8.69273C17.3855 3.89187 13.4936 0 8.69273 0C3.89187 0 0 3.89187 0 8.69273C0 13.4936 3.89187 17.3855 8.69273 17.3855Z' />
              <path
                d='M8.69237 9.60739C9.19772 9.60739 9.60739 9.19772 9.60739 8.69237C9.60739 8.18701 9.19772 7.77734 8.69237 7.77734C8.18701 7.77734 7.77734 8.18701 7.77734 8.69237C7.77734 9.19772 8.18701 9.60739 8.69237 9.60739Z'
                fill='#231B32'
              />
              <path
                d='M8.69186 6.40325C9.95524 6.40325 10.9794 5.37907 10.9794 4.11569C10.9794 2.8523 9.95524 1.82812 8.69186 1.82812C7.42847 1.82812 6.4043 2.8523 6.4043 4.11569C6.4043 5.37907 7.42847 6.40325 8.69186 6.40325Z'
                fill='#231B32'
              />
              <path
                d='M8.69186 15.5517C9.95524 15.5517 10.9794 14.5275 10.9794 13.2641C10.9794 12.0007 9.95524 10.9766 8.69186 10.9766C7.42847 10.9766 6.4043 12.0007 6.4043 13.2641C6.4043 14.5275 7.42847 15.5517 8.69186 15.5517Z'
                fill='#231B32'
              />
              <path
                d='M13.268 10.9775C14.5314 10.9775 15.5556 9.95329 15.5556 8.68991C15.5556 7.42652 14.5314 6.40234 13.268 6.40234C12.0046 6.40234 10.9805 7.42652 10.9805 8.68991C10.9805 9.95329 12.0046 10.9775 13.268 10.9775Z'
                fill='#231B32'
              />
              <path
                d='M4.11764 10.9775C5.38102 10.9775 6.4052 9.95329 6.4052 8.68991C6.4052 7.42652 5.38102 6.40234 4.11764 6.40234C2.85425 6.40234 1.83008 7.42652 1.83008 8.68991C1.83008 9.95329 2.85425 10.9775 4.11764 10.9775Z'
                fill='#231B32'
              />
            </svg>
          </ListItemIcon>
          <ListItemText>Collection</ListItemText>
        </ListItemButton>
      </List>

      <Divider />

      <List className='menu-each-block'>
        <p>SOCIAL</p>
        <ListItemButton>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <ChatOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Messages</ListItemText>
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <NotificationsNoneOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Notifications</ListItemText>
        </ListItemButton>
      </List>

      <Divider />

      <List className='menu-each-block'>
        <p>CREATE</p>
        <ListItemButton>
          <ListItemIcon>
            <AddPhotoAlternateOutlinedIcon />
          </ListItemIcon>
          <ListItemText>POST</ListItemText>
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <ChatOutlinedIcon />
          </ListItemIcon>
          <ListItemText>REVIEW</ListItemText>
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <PlaylistPlayOutlinedIcon />
          </ListItemIcon>
          <ListItemText>PLAYLIST</ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
  return (
    <div>
      {/* {user?._id && ( */}
      {!publicRoutes.includes(pathname) && (
        <div>
          <Drawer
            open={open}
            onClose={() => {
              toggleDrawer(false);
            }}
          >
            {DrawerList}
          </Drawer>
          <Box className='header-wrap'>
            <Container maxWidth={false}>
              <Grid2
                container
                spacing={1}
                className='large-container header-inner'
              >
                <Grid2
                  size={{ lg: 4, md: 4, sm: 4, xs: 4 }}
                  className='header-logo'
                >
                  <Image
                    width={196}
                    height={44}
                    src={
                      theme === "dark"
                        ? "/images/dark-logo.svg"
                        : "/images/lightLogo.png"
                    }
                    alt=''
                  />
                </Grid2>

                <Grid2
                  size={{ lg: 4, md: 4, sm: 4, xs: 4 }}
                  className='header-page-tab'
                >
                  <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                    onClick={() => {
                      toggleDrawer(true);
                    }}
                    className='menu-toggle'
                  >
                    <MenuIcon />
                  </IconButton>
                  <ul className='page-tab'>
                    <li>
                      <ButtonField
                        mainCls='p-btn'
                        label='Community'
                        customJsx={
                          <span className='icon'>
                            <svg
                              width='20'
                              height='21'
                              viewBox='0 0 20 15'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M14.25 8.48828C15.4488 9.30204 16.2888 10.4045 16.2888 11.8746V14.4996H19.7888V11.8746C19.7888 9.96704 16.665 8.83828 14.25 8.48828Z' />
                              <path d='M12.7888 7.50004C14.7225 7.50004 16.2888 5.93378 16.2888 4.00002C16.2888 2.06626 14.7225 0.5 12.7888 0.5C12.3775 0.5 11.9925 0.5875 11.625 0.710001C12.3513 1.61126 12.7888 2.75751 12.7888 4.00002C12.7888 5.24253 12.3513 6.38879 11.625 7.29004C11.9925 7.41254 12.3775 7.50004 12.7888 7.50004Z' />
                              <path d='M7.53908 7.50004C9.47285 7.50004 11.0391 5.93378 11.0391 4.00002C11.0391 2.06626 9.47285 0.5 7.53908 0.5C5.60532 0.5 4.03906 2.06626 4.03906 4.00002C4.03906 5.93378 5.60532 7.50004 7.53908 7.50004ZM7.53908 2.25001C8.50159 2.25001 9.2891 3.03752 9.2891 4.00002C9.2891 4.96253 8.50159 5.75003 7.53908 5.75003C6.57658 5.75003 5.78907 4.96253 5.78907 4.00002C5.78907 3.03752 6.57658 2.25001 7.53908 2.25001Z' />
                              <path d='M7.53911 8.375C5.20284 8.375 0.539062 9.54751 0.539062 11.875V14.5H14.5392V11.875C14.5392 9.54751 9.87537 8.375 7.53911 8.375ZM12.7891 12.75H2.28907V11.8838C2.46407 11.2538 5.17659 10.125 7.53911 10.125C9.90162 10.125 12.6141 11.2538 12.7891 11.875V12.75Z' />
                            </svg>
                          </span>
                        }
                      />
                    </li>
                    <li>
                      <ButtonField
                        onClick={gotoMovie}
                        mainCls='p-btn active'
                        label='Movies'
                        customJsx={
                          <span className='icon'>
                            <svg
                              width='21'
                              height='21'
                              viewBox='0 0 21 21'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M18.1738 16.2182V9.35547H16.3438V16.2182C16.3438 18.5057 18.1738 20.3358 20.4614 20.3358V18.5057C19.1803 18.5057 18.1738 17.4992 18.1738 16.2182Z' />
                              <path d='M9.4818 18.0495C14.2827 18.0495 18.1745 14.1577 18.1745 9.3568C18.1745 4.55593 14.2827 0.664062 9.4818 0.664062C4.68093 0.664062 0.789062 4.55593 0.789062 9.3568C0.789062 14.1577 4.68093 18.0495 9.4818 18.0495Z' />
                              <path
                                d='M9.48143 10.2715C9.98678 10.2715 10.3965 9.86178 10.3965 9.35643C10.3965 8.85108 9.98678 8.44141 9.48143 8.44141C8.97608 8.44141 8.56641 8.85108 8.56641 9.35643C8.56641 9.86178 8.97608 10.2715 9.48143 10.2715Z'
                                fill='#4B3F72'
                              />
                              <path
                                d='M9.48092 7.06731C10.7443 7.06731 11.7685 6.04313 11.7685 4.77975C11.7685 3.51636 10.7443 2.49219 9.48092 2.49219C8.21754 2.49219 7.19336 3.51636 7.19336 4.77975C7.19336 6.04313 8.21754 7.06731 9.48092 7.06731Z'
                                fill='#4B3F72'
                              />
                              <path
                                d='M9.48092 16.2157C10.7443 16.2157 11.7685 15.1916 11.7685 13.9282C11.7685 12.6648 10.7443 11.6406 9.48092 11.6406C8.21754 11.6406 7.19336 12.6648 7.19336 13.9282C7.19336 15.1916 8.21754 16.2157 9.48092 16.2157Z'
                                fill='#4B3F72'
                              />
                              <path
                                d='M14.0571 11.6415C15.3205 11.6415 16.3447 10.6174 16.3447 9.35397C16.3447 8.09058 15.3205 7.06641 14.0571 7.06641C12.7937 7.06641 11.7695 8.09058 11.7695 9.35397C11.7695 10.6174 12.7937 11.6415 14.0571 11.6415Z'
                                fill='#4B3F72'
                              />
                              <path
                                d='M4.9067 11.6415C6.17009 11.6415 7.19426 10.6174 7.19426 9.35397C7.19426 8.09058 6.17009 7.06641 4.9067 7.06641C3.64332 7.06641 2.61914 8.09058 2.61914 9.35397C2.61914 10.6174 3.64332 11.6415 4.9067 11.6415Z'
                                fill='#4B3F72'
                              />
                            </svg>
                          </span>
                        }
                      />
                    </li>
                  </ul>
                </Grid2>

                <Grid2
                  size={{ lg: 4, md: 4, sm: 4, xs: 4 }}
                  className='header-rt'
                >
                  <ul>
                    <li
                      className='header-search'
                      tabIndex={0}
                      onKeyUp={gotoSearchMovie}
                      role='button'
                      onClick={gotoSearchMovie}
                      aria-label='Search for movies'
                    >
                      <svg
                        width='21'
                        height='21'
                        viewBox='0 0 21 21'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M16.031 15.117L20.314 19.399L18.899 20.814L14.617 16.531C13.0237 17.8082 11.042 18.5029 9 18.5C4.032 18.5 0 14.468 0 9.5C0 4.532 4.032 0.5 9 0.5C13.968 0.5 18 4.532 18 9.5C18.0029 11.542 17.3082 13.5237 16.031 15.117ZM14.025 14.375C15.2941 13.0699 16.0029 11.3204 16 9.5C16 5.632 12.867 2.5 9 2.5C5.132 2.5 2 5.632 2 9.5C2 13.367 5.132 16.5 9 16.5C10.8204 16.5029 12.5699 15.7941 13.875 14.525L14.025 14.375Z' />
                      </svg>
                    </li>
                    <li className='header-create'>
                      <span className='icon'>
                        <Image
                          width={14}
                          height={15}
                          src='/images/plus-icon.svg'
                          alt=''
                        />
                      </span>
                      <span>Create</span>
                    </li>
                    <li className='header-notification'>
                      <svg
                        width='18'
                        height='22'
                        viewBox='0 0 18 22'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M15 8.5C15 6.9087 14.3679 5.38258 13.2426 4.25736C12.1174 3.13214 10.5913 2.5 9 2.5C7.4087 2.5 5.88258 3.13214 4.75736 4.25736C3.63214 5.38258 3 6.9087 3 8.5V16.5H15V8.5ZM17 17.167L17.4 17.7C17.4557 17.7743 17.4896 17.8626 17.498 17.9551C17.5063 18.0476 17.4887 18.1406 17.4472 18.2236C17.4057 18.3067 17.3419 18.3765 17.2629 18.4253C17.1839 18.4741 17.0929 18.5 17 18.5H1C0.907144 18.5 0.816123 18.4741 0.737135 18.4253C0.658147 18.3765 0.594313 18.3067 0.552787 18.2236C0.51126 18.1406 0.493682 18.0476 0.502021 17.9551C0.51036 17.8626 0.544287 17.7743 0.6 17.7L1 17.167V8.5C1 6.37827 1.84286 4.34344 3.34315 2.84315C4.84344 1.34285 6.87827 0.5 9 0.5C11.1217 0.5 13.1566 1.34285 14.6569 2.84315C16.1571 4.34344 17 6.37827 17 8.5V17.167ZM6.5 19.5H11.5C11.5 20.163 11.2366 20.7989 10.7678 21.2678C10.2989 21.7366 9.66304 22 9 22C8.33696 22 7.70107 21.7366 7.23223 21.2678C6.76339 20.7989 6.5 20.163 6.5 19.5Z' />
                      </svg>
                      <span className='noti-dot' />
                    </li>
                    <li className='header-message'>
                      <svg
                        width='20'
                        height='19'
                        viewBox='0 0 20 19'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M1.34126e-06 6.49401C-0.000525832 5.70621 0.154353 4.92605 0.455768 4.19819C0.757183 3.47034 1.19921 2.80909 1.75655 2.25231C2.31388 1.69553 2.97558 1.25416 3.70373 0.953478C4.43189 0.652791 5.21221 0.498693 6 0.500008H14C17.313 0.500008 20 3.19501 20 6.49401V18.5H6C2.687 18.5 1.34126e-06 15.805 1.34126e-06 12.506V6.49401ZM18 16.5V6.49401C17.9974 5.43451 17.5749 4.41925 16.8251 3.67063C16.0754 2.92201 15.0595 2.50106 14 2.50001H6C5.47485 2.49869 4.9546 2.60106 4.4691 2.80123C3.98359 3.00141 3.54238 3.29546 3.17076 3.66652C2.79914 4.03758 2.50443 4.47835 2.30353 4.96356C2.10262 5.44876 1.99947 5.96886 2 6.49401V12.506C2.00265 13.5655 2.42511 14.5808 3.17486 15.3294C3.9246 16.078 4.9405 16.499 6 16.5H18ZM12 8.50001H14V10.5H12V8.50001ZM6 8.50001H8V10.5H6V8.50001Z' />
                      </svg>
                      <span className='noti-dot' />
                    </li>

                    <li
                      className='user-perfile'
                      aria-describedby={id}
                      aria-label='User Image'
                      role='button'
                      tabIndex={0}
                      onClick={(e) => handleClick(e)}
                      onKeyUp={(e) => handleClick(e)}
                    >
                      <Image fill src='/images/profile-img.jpg' alt='' />
                    </li>
                    <Popover
                      id={id}
                      open={profileopen}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <List className='user-profile-menu'>
                        <ListItemButton>
                          <ListItemText>
                            {user.first_name} {user.last_name}
                          </ListItemText>
                          <ListItemIcon
                            role='button'
                            tabIndex={0}
                            onClick={handleClose}
                          >
                            <CloseIcon />
                          </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton>
                          <ListItemIcon>
                            <Image
                              width={28}
                              height={28}
                              src='/images/profile-img.jpg'
                              alt=''
                            />
                          </ListItemIcon>
                          <ListItemText>
                            {user.first_name} {user.last_name}
                          </ListItemText>
                        </ListItemButton>

                        <ListItemButton>
                          <ListItemIcon>
                            <SettingsIcon />
                          </ListItemIcon>
                          <ListItemText>Settings</ListItemText>
                        </ListItemButton>

                        <ListItemButton onClick={handleLogout}>
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText>Log out</ListItemText>
                        </ListItemButton>
                      </List>
                    </Popover>
                    <li>
                      <DarkModeSwitch
                        checked={theme === "dark"}
                        onChange={toggleDarkMode}
                        size={25}
                      />
                    </li>
                  </ul>
                </Grid2>
              </Grid2>
            </Container>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Header;
