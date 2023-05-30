from scapy.all import srp,Ether,ARP,conf,sendp,arping,IP
from generate_mac import generate_mac
from scapy.contrib.lldp import *

def fdb_table():
    for i in range(17000):
        mac_src = generate_mac.vid_provided("00:06:8C")
        sendp(Ether(src=mac_src)/IP(dst="1.2.3.4", ttl=(1,4)), iface="Test")

# 28:10:7B:00:00:00
def surveillance():
    mac_src = "28:10:7B:00:00:00"
    sendp(Ether(src=mac_src)/IP(dst="1.2.3.4", ttl=(1,4)), iface="Test")

# surveillance()

def lldp():
    
    lldp = Ether(dst="01:80:c2:00:00:0e", src="00:11:22:33:44:55") / \
       LLDPDU(tlvlist=[
           LLDPDUChassisID(subtype=4),
           LLDPDUPortID(subtype=7),
           LLDPDUTimeToLive(ttl=120)
       ])
    
    sendp(lldp, iface="Test")

lldp()