#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
#  storifier.py
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

import requests
import time
import random
import sched
import praw
import tweepy
try:
	import simplejson as json
except ImportError:
	import json

class getStories():
	""" Get Stories from all news sources and push into a common JSON file """
	
	def __init__ (self):
		""" Class initialiser """
		self.trendDict = {}
		self.consumer_key = #FILL FROM TWITTER
		self.consumer_secret = #FILL FROM TWITTER
		self.access_token = #FILL FROM TWITTER
		self.access_token_secret = #FILL FROM TWITTER
		self.auth = None
		self.api = None
		self.redditBot = None
		self.collectedTweets = {}
		pass
		
	def authApp (self):
		""" Authenticate the application using OAuth """
		self.auth = tweepy.OAuthHandler(self.consumer_key, self.consumer_secret)
		self.auth.set_access_token(self.access_token, self.access_token_secret)
		self.api = tweepy.API(self.auth)
		self.redditBot = praw.Reddit("#FILL CUSTOM USER AGENT#")
		pass

	def readTrends (self):
		""" Read Trends from File """
		with open("catTrends.json",'r') as File:
			self.trendDict = json.load(File)
		pass
		
	def getNYT (self,trend):
		""" Get Stories from NYT for a particular trend"""
		currentDate = str(time.strftime("%Y%m%d"))
		payload = {'api-key':'','q':trend,'sort':'newest','begin_date':'20140101','end_date':currentDate} #FILL CUSTOM NYT KEY
		response = requests.get("http://api.nytimes.com/svc/search/v2/articlesearch.json",params=payload)
		storySet = response.json()
		storyList = []
		if storySet["status"] == "OK":
			if len(storySet["response"]["docs"])!=0:
				for doc in storySet["response"]["docs"]:
					storyDict = {}
					storyDict["title"] = doc["headline"]["main"]
					storyDict["content"] = doc["snippet"]
					storyDict["source"] = "nyt"
					storyDict["url"] = doc["web_url"]
					storyDict["image"] = "default"
					storyList.append(storyDict)
		
		return storyList
	
	def getGuardian (self,trend):
		""" Get stories from Guardian for a particular trend from the Guardian API """
		currentDate = time.strftime("%Y-%m-%d")
		payload = {'api-key':'','q':trend,'order-by':'newest','from-date':'2014-01-01','to-date':currentDate,'format':'JSON'} #FILL CUSTOM GUARDIAN KEY
		response = requests.get("http://content.guardianapis.com/search",params=payload)
		storySet = response.json()
		storyList = []
		if storySet["response"]["status"] == "ok":
			if len(storySet["response"]["results"])!=0:
				for result in storySet["response"]["results"]:
					storyDict = {}
					storyDict["title"] = result["webTitle"]
					storyContent = "Article titled "+result["webTitle"]+"  "+". Published on "+result["webPublicationDate"]+"  . Section of publication "+result["sectionName"]
					storyDict["source"] = "guardian"
					storyDict["content"] = storyContent
					storyDict["url"] = result["webUrl"]
					storyDict["image"] = "default"
					storyList.append(storyDict)

		return storyList			
		
	def getTweets (self, trend):
		""" Get the N most recent Tweets for a single trend """
		trendLimit = 20
		cur_date = time.strftime("%Y-%m-%d")
		storyList = []
		for tweet in tweepy.Cursor(self.api.search,q=trend,result_type="popular",include_entities=True,lang="en",since="2014-04-01",until=cur_date).items(trendLimit):
			if tweet.text:
				storyDict = {}
				storyDict["title"] = tweet.user.screen_name
				storyDict["content"] = tweet.text+" . Created at "+str(tweet.created_at)
				storyDict["metadata"] = "Retweet Count "+str(tweet.retweet_count)+" .With ID "+str(tweet.id)
				storyDict["source"] = "twitter"
				storyDict["url"] = "http://www.twitter.com"
				storyDict["image"] = "default"
				storyList.append(storyDict)
			
		return storyList
	
	def getRedditStories (self,trend):
		""" Get stories from Reddit for a particular trend """
		results = self.redditBot.search(trend,sort='top',period='month',limit='20')
		storyList = []
		for result in results:
			storyDict = {}
			storyDict["title"] = result.title
			if result.selftext:
				storyDict["content"] = result.selftext
			else:
				storyDict["content"] = "No preview  to display"
			storyDict["source"] = "reddit"
			if result.url!="":
				storyDict["url"] = result.url
			else:
				storyDict["url"] = "http://www.reddit.com"
			storyDict["image"] = "default"
			storyList.append(storyDict)
		
		return storyList
		
	def compileStories (self):
		""" Compile stories category wise and topic wise """
		self.authApp()
		self.readTrends()
		storyObject = {}
		for trendCategory in self.trendDict:
			print("Category: "+str(trendCategory))
			if trendCategory not in storyObject:
				storyObject[trendCategory] = {}
			for trend in self.trendDict[trendCategory]:
				storyObject[trendCategory][trend] = []
				storyObject[trendCategory][trend] = self.getNYT(trend)+self.getGuardian(trend)+self.getTweets(trend)+self.getRedditStories(trend)
		jObject = json.dumps(storyObject)
		f = open('stories.js','w').close()
		with open('stories.js','w') as File:
			File.write('var STORIES =')
			File.write(jObject)
			File.write(';')
		pass
		


def main():
	
	g = getStories();
	g.compileStories()
	return 0

if __name__ == '__main__':
	main()

