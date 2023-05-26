from scapy.all import srp,Ether,ARP,conf,sendp,arping,IP
from generate_mac import generate_mac


for i in range(17000):
    mac_src = generate_mac.vid_provided("00:06:8C")
    sendp(Ether(src=mac_src)/IP(dst="1.2.3.4", ttl=(1,4)), iface="Test")