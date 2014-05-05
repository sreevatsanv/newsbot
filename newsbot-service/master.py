#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
#  master.py
#  
#  Copyright 2014 Sreevatsan Vaidyanathan <watson@dragonPC>
#  
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#  
#  

from datetime import datetime as dt
import logging
import time
import sys
sched = sched.scheduler(time.time,time.sleep)
def print_time(time):
	print(time)
def main():
	
	
	
	logging.basicConfig(format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p',filename='scheduler.log',level=logging.INFO)
	logging.info(" Testing Gathered")
	timevar = time.strftime("%Y %m %d %H %M")
	sched.add_interval_job(print_time, minutes=1, args=[timevar])
	sched.start()
	return 0

if __name__ == '__main__':
	main()

