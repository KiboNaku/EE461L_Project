import sys
from models import Hardware

if __name__ == "__main__":
    hw_name = sys.argv[1]
    hw_avail = int(sys.argv[2])
    hardware = Hardware(
        hardware_name=hw_name,
        price_per_unit=0,
        total_count=hw_avail,
        available_count=hw_avail, 
        extra_time_rate=0
    )
    hardware.save()