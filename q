[0;1;32m●[0m ubuntu-lamp
    State: [0;1;32mrunning[0m
     Jobs: 0 queued
   Failed: 0 units
    Since: Tue 2024-01-16 22:05:42 UTC; 1 week 1 day ago
   CGroup: /
           ├─user.slice 
           │ └─user-0.slice 
           │   ├─session-885.scope 
           │   │ ├─[0;38;5;245m106737 sshd: root@pts/1[0m
           │   │ ├─[0;38;5;245m106844 -bash[0m
           │   │ ├─[0;38;5;245m106878 sudo systemctl status[0m
           │   │ ├─[0;38;5;245m106879 sudo systemctl status[0m
           │   │ ├─[0;38;5;245m106880 systemctl status[0m
           │   │ └─[0;38;5;245m106881 pager[0m
           │   ├─session-882.scope 
           │   │ ├─[0;38;5;245m106349 sshd: root@notty[0m
           │   │ └─[0;38;5;245m106498 /usr/lib/openssh/sftp-server[0m
           │   ├─session-886.scope 
           │   │ ├─[0;38;5;245m106757 sshd: root@notty[0m
           │   │ └─[0;38;5;245m106849 /usr/lib/openssh/sftp-server[0m
           │   ├─session-880.scope 
           │   │ ├─[0;38;5;245m106339 sshd: root@pts/0[0m
           │   │ └─[0;38;5;245m106450 -bash[0m
           │   └─[0m[0;4muser@0.service[0m [0;1;39m…[0m
           │     └─init.scope 
           │       ├─[0;38;5;245m106342 /lib/systemd/systemd --user[0m
           │       └─[0;38;5;245m106344 (sd-pam)[0m
           ├─init.scope 
           │ └─[0;38;5;245m1 /lib/systemd/systemd --system --deserialize 38[0m
           └─system.slice 
             ├─apache2.service 
             │ ├─[0;38;5;245m 87035 /usr/sbin/apache2 -k start[0m
             │ ├─[0;38;5;245m 96534 /usr/sbin/apache2 -k start[0m
             │ ├─[0;38;5;245m104144 /usr/sbin/apache2 -k start[0m
             │ ├─[0;38;5;245m104146 /usr/sbin/apache2 -k start[0m
             │ ├─[0;38;5;245m104147 /usr/sbin/apache2 -k start[0m
             │ ├─[0;38;5;245m104148 /usr/sbin/apache2 -k start[0m
             │ ├─[0;38;5;245m104149 /usr/sbin/apache2 -k start[0m
             │ ├─[0;38;5;245m104150 /usr/sbin/apache2 -k start[0m
             │ ├─[0;38;5;245m104151 /usr/sbin/apache2 -k start[0m
             │ ├─[0;38;5;245m104152 /usr/sbin/apache2 -k start[0m
             │ └─[0;38;5;245m104153 /usr/sbin/apache2 -k start[0m
             ├─packagekit.service 
             │ └─[0;38;5;245m22642 /usr/libexec/packagekitd[0m
             ├─systemd-networkd.service 
             │ └─[0;38;5;245m22684 /lib/systemd/systemd-networkd[0m
             ├─systemd-udevd.service 
             │ └─[0;38;5;245m22653 /lib/systemd/systemd-udevd[0m
             ├─cron.service 
             │ ├─[0;38;5;245m 22636 /usr/sbin/cron -f -P[0m
             │ ├─[0;38;5;245m106678 /usr/sbin/CRON -f -P[0m
             │ ├─[0;38;5;245m106679 /bin/sh -c    cd / && run-parts --report /etc/cron.hourly[0m
             │ ├─[0;38;5;245m106680 run-parts --report /etc/cron.hourly[0m
             │ ├─[0;38;5;245m106681 /bin/sh /etc/cron.hourly/droplet-agent[0m
             │ ├─[0;38;5;245m106682 /bin/bash /opt/digitalocean/droplet-agent/scripts/update.sh[0m
             │ └─[0;38;5;245m106683 sleep 701[0m
             ├─system-serial\x2dgetty.slice 
             │ └─serial-getty@ttyS0.service 
             │   └─[0;38;5;245m22639 /sbin/agetty -o -p -- \u --keep-baud 115200,57600,38400,9600 ttyS0 vt220[0m
             ├─polkit.service 
             │ └─[0;38;5;245m22641 /usr/libexec/polkitd --no-debug[0m
             ├─networkd-dispatcher.service 
             │ └─[0;38;5;245m731 /usr/bin/python3 /usr/bin/networkd-dispatcher --run-startup-triggers[0m
             ├─multipathd.service 
             │ └─[0;38;5;245m22650 /sbin/multipathd -d -s[0m
             ├─systemd-journald.service 
             │ └─[0;38;5;245m22644 /lib/systemd/systemd-journald[0m
             ├─unattended-upgrades.service 
             │ └─[0;38;5;245m821 /usr/bin/python3 /usr/share/unattended-upgrades/unattended-upgrade-shutdown --wait-for-signal[0m
             ├─ssh.service 
             │ ├─[0;38;5;245m 22666 sshd: /usr/sbin/sshd -D [listener] 2 of 10-100 startups[0m
             │ ├─[0;38;5;245m106738 sshd: root [priv][0m
             │ ├─[0;38;5;245m106740 sshd: root [net][0m
             │ ├─[0;38;5;245m106876 sshd: [accepted][0m
             │ └─[0;38;5;245m106877 sshd: [net][0m
             ├─snapd.service 
             │ └─[0;38;5;245m23268 /usr/lib/snapd/snapd[0m
             ├─mysql.service 
             │ └─[0;38;5;245m15770 /usr/sbin/mysqld[0m
             ├─rsyslog.service 
             │ └─[0;38;5;245m79279 /usr/sbin/rsyslogd -n -iNONE[0m
             ├─system-postfix.slice 
             │ └─postfix@-.service 
             │   ├─[0;38;5;245m 79238 /usr/lib/postfix/sbin/master -w[0m
             │   ├─[0;38;5;245m 79241 qmgr -l -t unix -u[0m
             │   └─[0;38;5;245m106125 pickup -l -t unix -u -c[0m
             ├─systemd-resolved.service 
             │ └─[0;38;5;245m22698 /lib/systemd/systemd-resolved[0m
             ├─dbus.service 
             │ └─[0;38;5;245m723 @dbus-daemon --system --address=systemd: --nofork --nopidfile --systemd-activation --syslog-only[0m
             ├─systemd-timesyncd.service 
             │ └─[0;38;5;245m22640 /lib/systemd/systemd-timesyncd[0m
             ├─droplet-agent.service 
             │ └─[0;38;5;245m2820 /opt/digitalocean/bin/droplet-agent[0m
             ├─system-getty.slice 
             │ └─getty@tty1.service 
             │   └─[0;38;5;245m748 /sbin/agetty -o -p -- \u --noclear tty1 linux[0m
             └─systemd-logind.service 
               └─[0;38;5;245m741 /lib/systemd/systemd-logind[0m
