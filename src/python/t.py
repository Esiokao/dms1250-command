from scapy.contrib.lldp import *

# 定义LLDP封包
lldp_packet = (
    Ether(dst="01:80:c2:00:00:0e") /  # 目标MAC地址设置为LLDP的组播地址
    LLDP(tlvlist=[
        LLDPDUChassisID(
            subtype=7,  # MAC地址类型
            length=7,
            id="00:11:22:33:44:55"  # 设置您的MAC地址
        ),
        LLDPDUPortID(
            subtype=7,  # 接口名称类型
            length=4,
            id="Eth1"  # 设置您的接口名称
        ),
        LLDPDUTimeToLive(ttl=120  # TTL值
                         ),
        LLDPDUEnd()
    ]))

# 发送LLDP封包
sendp(lldp_packet, iface="eth0")  # 选择发送LLDP封包的网络接口
