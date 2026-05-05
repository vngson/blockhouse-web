import React from 'react';
  import {
    Box,
    Drawer,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Avatar,
    alpha,
  } from '@mui/material';
  import { useTheme } from '@mui/material/styles';
  import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
  import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
  import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
  import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded';
  import { useLocation, useNavigate } from 'react-router-dom';
  import logoDark from '@blockhouse/shared-lib/assets/blockhouse_logo_transparent_white.png';
  import logoLight from '@blockhouse/shared-lib/assets/blockhouse_logo_transparent.png';   

  const MENU_ITEMS = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardRoundedIcon /> },
    { label: 'Nhân viên', path: '/employees', icon: <PeopleAltRoundedIcon /> },
    { label: 'Doanh thu', path: '/revenue', icon: <MonetizationOnRoundedIcon /> },
    { label: 'Dịch vụ', path: '/services', icon: <ContentCutRoundedIcon /> },
  ];

  interface SidebarProps {
    open: boolean;
    width: number;
  }

  export default function Sidebar({ open, width }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();                                                                                                              
    const logo = theme.palette.mode === 'dark' ? logoDark : logoLight;  
    const s = theme.sidebar;

    const isActive = (path: string) =>
      location.pathname === path || (path === '/dashboard' && location.pathname === '/');

    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: open ? width : 0,
          flexShrink: 0,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '& .MuiDrawer-paper': {
            width,
            boxSizing: 'border-box',
            background: s.gradient,
            borderRight: `1px solid ${s.divider}`,
            boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
            overflowX: 'hidden',
          },
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 3,
            py: 3.5,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '16px',
              right: '16px',
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${s.divider}, transparent)`,
            },
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="BlockHouse"
            sx={{
              width: 44,
              height: 44,
              objectFit: 'contain',
              borderRadius: '12px',
              background: s.logoBg,
              p: 0.5,
            }}
          />
          <Box>
            <Typography
              variant="body1"
              fontWeight={700}
              sx={{
                color: s.textPrimary,
                letterSpacing: 0.8,
                fontSize: '1.1rem',
                lineHeight: 1.2,
              }}
            >
              BlockHouse
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: s.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}
            >
              Barber Manager
            </Typography>
          </Box>
        </Box>

        {/* Menu Section Label */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            px: 3.5,
            pt: 3,
            pb: 1,
            color: s.textMuted,
            fontWeight: 600,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            fontSize: '0.65rem',
          }}
        >
          Menu
        </Typography>

        {/* Navigation Items */}
        <Box sx={{ px: 1.5 }}>
          {MENU_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
                disableRipple
                sx={{
                  position: 'relative',
                  borderRadius: '10px',
                  mb: 0.5,
                  py: 1.3,
                  px: 2,
                  bgcolor: active ? s.activeBg : 'transparent',
                  color: active ? s.activeColor : s.textSecondary,
                  '&:hover': {
                    bgcolor: active ? alpha(s.activeColor, 0.16) : s.hoverBg,
                    color: active ? s.activeColor : s.textPrimary,
                  },
                  '&:active': {
                    bgcolor: alpha(s.activeColor, 0.2),
                  },
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  ...(active && {
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '8px',
                      bottom: '8px',
                      width: '3px',
                      borderRadius: '0 4px 4px 0',
                      background: s.activeBar,
                      boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                    },
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: 'inherit',
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.3rem',
                      transition: 'transform 0.2s',
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active ? 600 : 400,
                    fontSize: '0.875rem',
                    sx: { transition: 'font-weight 0.2s' },
                  }}
                />
                {active && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: theme.palette.primary.main,
                      boxShadow: `0 0 8px ${alpha(theme.palette.primary.main, 0.6)}`,
                    }}
                  />
                )}
              </ListItemButton>
            );
          })}
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Bottom Section */}
        {/* <Box
          sx={{
            px: 2.5,
            py: 2.5,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '16px',
              right: '16px',
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${s.divider}, transparent)`,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: '12px',
              bgcolor: s.hoverBg,
              '&:hover': { bgcolor: alpha(s.activeColor, 0.07) },
              transition: 'background 0.2s',
              cursor: 'pointer',
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: s.avatarBg,
                color: s.avatarColor,
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              BH
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ color: s.textPrimary, lineHeight: 1.3, fontSize: '0.82rem' }}
                noWrap
              >
                Admin
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: s.textSecondary, fontSize: '0.7rem' }}
                noWrap
              >
                Quản lý hệ thống
              </Typography>
            </Box>
          </Box>
        </Box> */}
      </Drawer>
    );
  }
