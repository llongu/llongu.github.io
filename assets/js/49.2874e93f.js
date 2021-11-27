(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{482:function(n,t,o){"use strict";o.r(t);var e=o(34),i=Object(e.a)({},(function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[o("blockquote",[o("p",[n._v("bin")])]),n._v(" "),o("p",[n._v("系统有很多放置执⾏档的⽬录，但/bin ⽐较特殊。因为/bin 放置的是在单⼈维护模式下\n还能够被操作的指令。在/bin 底下的指令可以被 root 与⼀般帐号所使⽤，主要有：\ncat,chmod(修改权限), chown, date, mv, mkdir, cp, bash 等等常⽤的指令。")]),n._v(" "),o("blockquote",[o("p",[n._v("boot")])]),n._v(" "),o("p",[n._v("主要放置开机会使⽤到的档案，包括 Linux 核⼼档案以及开机选单与开机所需设定档等\n等。Linux kernel 常⽤的档名为：vmlinuz ，如果使⽤的是 grub 这个开机管理程式，则\n还会存在/boot/grub/这个⽬录。")]),n._v(" "),o("blockquote",[o("p",[n._v("dev")])]),n._v(" "),o("p",[n._v("在 Linux 系统上，任何装置与周边设备都是以档案的型态存在于这个⽬录当中。 只要通\n过存取这个⽬录下的某个档案，就等于存取某个装置。⽐要重要的档案有/dev/null,\n/dev/zero, /dev/tty , /dev/lp, / dev/hd, /dev/sd*等等")]),n._v(" "),o("blockquote",[o("p",[n._v("etc")])]),n._v(" "),o("p",[n._v("系统主要的设定档⼏乎都放置在这个⽬录内，例如⼈员的帐号密码档、各种服务的启\n始档等等。 ⼀般来说，这个⽬录下的各档案属性是可以让⼀般使⽤者查阅的，但是只\n有 root 有权⼒修改。 FHS 建议不要放置可执⾏档(binary)在这个⽬录中。 ⽐较重要的档\n案有：/etc/inittab, /etc/init.d/, /etc/modprobe.conf, /etc/X11/, /etc/fstab,\n/etc/sysconfig/等等。 另外，其下重要的⽬录有：/etc/init.d/ ：所有服务的预设启动\nscript 都是放在这⾥的，例如要启动或者关闭 iptables 的话： /etc/init.d/iptables\nstart、/etc/init.d/ iptables stop/etc/xinetd.d/ ：这就是所谓的 super daemon 管理的\n各项服务的设定档⽬录。/etc/X11/ ：与 X Window 有关的各种设定档都在这⾥，尤其\n是 xorg.conf 或 XF86Config 这两个 X Server 的设定档。")]),n._v(" "),o("blockquote",[o("p",[n._v("home")])]),n._v(" "),o("p",[n._v("这是系统预设的使⽤者家⽬录(home directory)。 在你新增⼀个⼀般使⽤者帐号时，\n预设的使⽤者家⽬录都会规范到这⾥来。⽐较重要的是，家⽬录有两种代号： ~ ：代\n表当前使⽤者的家⽬录，⽽ ~guest：则代表⽤户名为 guest 的家⽬录。\n系统的函式库⾮常的多，⽽/lib 放置的则是在开机时会⽤到的函式库，以及在/bin\n或/sbin 底下的指令会呼叫的函式库⽽已 。 什么是函式库呢？妳可以将他想成是外挂，\n如果状态为“未启⽤”，按照如下步骤操作\n1、重启电脑，在主板显示画⾯，快速寻找进⼊ BIOS 的按键。根据品牌不同，可能是 F2、Del\n或其他键。 2、进⼊ BIOS 后，寻找进⼊“System Configuration”。 3、找到“Virtualization\nTechnology”，按回⻋键。 4、选择“Enabled”，按 Enter 回⻋键。 5、然后保存重启即可。\n2.2 安装过程\n⻅直播视频\n2.3 配置过程\n⻅直播视频\n3、 认识 Linux 环境\nLinux 下的⽬录都是做什么⽤的")]),n._v(" "),o("blockquote",[o("p",[n._v("lib")])]),n._v(" "),o("p",[n._v("某些指令必须要有这些外挂才能够顺利完成程式的执⾏之意。 尤其重要的\n是/lib/modules/这个⽬录，因为该⽬录会放置核⼼相关的模组(驱动程式)。")]),n._v(" "),o("blockquote",[o("p",[n._v("media")])]),n._v(" "),o("p",[n._v("media 是媒体的英⽂，顾名思义，这个/media 底下放置的就是可移除的装置。 包括软\n碟、光碟、DVD 等等装置都暂时挂载于此。 常⻅的档名有：/media/floppy,\n/media/cdrom 等等。")]),n._v(" "),o("blockquote",[o("p",[n._v("mnt")])]),n._v(" "),o("p",[n._v("如果妳想要暂时挂载某些额外的装置，⼀般建议妳可以放置到这个⽬录中。在古早时\n候，这个⽬录的⽤途与/media 相同啦。 只是有了/media 之后，这个⽬录就⽤来暂时挂\n载⽤了。")]),n._v(" "),o("blockquote",[o("p",[n._v("opt")])]),n._v(" "),o("p",[n._v("这个是给第三⽅协⼒软体放置的⽬录 。 什么是第三⽅协⼒软体啊？举例来说，KDE 这\n个桌⾯管理系统是⼀个独⽴的计画，不过他可以安装到 Linux 系统中，因此 KDE 的软体\n就建议放置到此⽬录下了。 另外，如果妳想要⾃⾏安装额外的软体(⾮原本的\ndistribution 提供的)，那么也能够将你的软体安装到这⾥来。 不过，以前的 Linux 系统\n中，我们还是习惯放置在/usr/local ⽬录下。")]),n._v(" "),o("blockquote",[o("p",[n._v("root")])]),n._v(" "),o("p",[n._v("系统管理员(root)的家⽬录。 之所以放在这⾥，是因为如果进⼊单⼈维护模式⽽仅挂载\n根⽬录时，该⽬录就能够拥有 root 的家⽬录，所以我们会希望 root 的家⽬录与根⽬录\n放置在同⼀个分区中。")]),n._v(" "),o("blockquote",[o("p",[n._v("sbin")])]),n._v(" "),o("p",[n._v("Linux 有⾮常多指令是⽤来设定系统环境的，这些指令只有 root 才能够利⽤来设定系\n统，其他使⽤者最多只能⽤来查询⽽已。放在/sbin 底下的为开机过程中所需要的，⾥\n⾯包括了开机、修复、还原系统所需要的指令。⾄于某些伺服器软体程式，⼀般则放\n置到/usr/sbin/当中。⾄于本机⾃⾏安装的软体所产⽣的系统执⾏档(system binary)，\n则放置到/usr/local/sbin/当中了。常⻅的指令包括：fdisk, fsck, ifconfig, init, mkfs 等\n等。")]),n._v(" "),o("blockquote",[o("p",[n._v("srv")])]),n._v(" "),o("p",[n._v("srv 可以视为 service 的缩写，是⼀些⽹路服务启动之后，这些服务所需要取⽤的资料⽬\n录。 常⻅的服务例如 WWW, FTP 等等。 举例来说，WWW 伺服器需要的⽹⻚资料就可\n以放置在/srv/www/⾥⾯。呵呵，看来平时我们编写的代码应该放到这⾥了。")]),n._v(" "),o("blockquote",[o("p",[n._v("tmp")])]),n._v(" "),o("p",[n._v("这是让⼀般使⽤者或者是正在执⾏的程序暂时放置档案的地⽅。这个⽬录是任何⼈都\n能够存取的，所以你需要定期的清理⼀下。当然，重要资料不可放置在此⽬录啊。 因\n为 FHS 甚⾄建议在开机时，应该要将/tmp 下的资料都删除")])])}),[],!1,null,null,null);t.default=i.exports}}]);