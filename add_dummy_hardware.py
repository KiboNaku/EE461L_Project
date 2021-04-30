import sys
from models import Hardware

if __name__ == "__main__":
    hw_name = sys.argv[1]
    hw_avail = int(sys.argv[2])
    cost = 0
    hardware = Hardware(
        hardware_name=hw_name,
        price_per_unit=cost,
        total_count=hw_avail,
        available_count=hw_avail, 
        extra_time_rate=cost*1.5
    )
    hardware.save()