# Changelog - Digital Benefit Sheet
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.1.0] - 2021-05-06
### Changed
- $40 activation is now $35 activation

### Fixed
- Fixed the discounts on the 5GB, 10GB and $110 Unlimited plans

## [4.0.0] - 2021-03-30
### Added
- Logs
- Student discount
- DPP Full Retail
- Credits Total
- Visa Card

### Changed
- Cookies should now expire at midnight. This will prevent "sessions" from continuing to the next day.
- Rearranged the Mix and Match plans to display from highest cost to lowest cost
- Visually separated Mix and Match 3.0, 2.0, and 1.0
- Moved discounts to its own tab
- "Common discounts" such as Military, First Responder, Nurse, etc., now can be selected using radio buttons
	- This helps clarify that only one can be selected, and makes it easier to add/remove discounts going forward
- Added a new format for the DPP page
	- This new format takes up less space, so you can add more device payments
	- The new "popup" allows more space for the added "Total" option for both dpp and credits, as well as "Manual" mode
	- This should also be easier for someone new to learn

## [3.3.0] - 2021-02-18
### Added
- Added Business tablet plan updates
- Added LTE Home Internet

### Changed
- The Business DPP Section now matches the consumer side

### Fixed
- Password reset should now be fixed

## [3.2.0] - 2021-02-01
### Added
- Added the new Loyalty Mix and Match plans

### Fixed
- Removed the Gizmo discount from the Do More Unlimited plan

## [3.1.0] - 2020-11-20
### Added
- Business plans now show the labels of chosen plans and devices on the Benefit Sheet (the same way Consumer plans work)

### Fixed
- Fixed the color mismatch on the benefits when printing the Benefit Sheet

## [3.0.3] - 2020-11-19
### Fixed
- It turns out that many users were putting in their emails with capital letters. This was causing the site to reject the credentials. This has now been fixed by converting the entire email to lowercase before authenticating the user
- The military discount on Business accounts has giving twice the correct amount. This is now fixed

## [3.0.2] - 2020-11-18
### Fixed
- Many users were running into traffic-related issues
	- To fix this, instead of updating devices every time a user navigates to the DPP page, the site will now save the list of devices in the state
	- The benefit is that users will be ***far*** less likely to run into traffic-related issues
	- The downside is that **users will now need to logout and login in order to see updated device pricing**
	- Users are forced to log in at least once a day, so this shouldn't be much of an issue

## [3.0.1] - 2020-11-12
### Fixed
- Pull thru devices on Business plans weren't editing the correct values

## [3.0.0] - 2020-11-10
### Added
- Added devices to the database
	- There is now a dropdown list of devices to the DPP section
	- When you choose a device, it populates the DPP with the full retail divided by 24 months
	- You can still add DPP manually, either by leaving the device input blank, or choosing the "Manual" option
	- **Admins can edit devices from the admin panel. I am unable to stay on top of any changes by myself, so please make sure to update whenever changes are made to the Pricing and Ordering Sheet**

### Changed
- Changed servers
	- Benefits
		- Better scalability
		- Better security
		- More adaptable to future needs
		- More control
	- Please let me know if you notice any performance issues
- The admin panel is now an entirely separate app
	- This will help with performance, as well as help me maintain the project

## [2.8.0] - 2020-10-02
### Added
- Added the option to pull last month's usage csv in the admin panel

## [2.7.0] - 2020-09-17
### Added
- Added the new Unlimited Plus plan options for tablets and jetpacks
- Added a "Notes" section to the "accordion" style of the Benefit Sheet
- Added Disney+, Hulu, ESPN+ as a benefit in the dropdown list

## [2.6.0] - 2020-08-20
### Added
- Added Mix and Match 3.0 plans
- Added a CSV download to the admin panel

## [2.5.1] - 2020-07-21
### Changed
- There is some confusion about what discounts apply to the 5GB plan, so I have temporarily removed any discounts (other than autopay) from the calculations
	- I will add these back once we have clarification on what does/doesn't qualify

## [2.5.0] - 2020-07-13
### Added
- Added labeling above the options that specify what devices are a part of each option
	- This is limited to phone plans and pull thru

### Fixed
- Fixed a spelling error

## [2.4.0] - 2020-07-02
### Added
- Added the new 5GB and 10GB plans

## [2.3.0] - 2020-06-16
### Added
- Added some more benefits to the dropdown on the Benefit Sheet Page

### Fixed
- I am now rounding the displayed tax percent on the Benefit Sheet to the nearest third decimal point
	- This is because of a known issue when dealing with decimal points when programming
	- [Here](https://floating-point-gui.de/) is more information on this issue if you're curious

## [2.2.0] - 2020-06-09
### Added
- Added the Loyalty 55+ plan
	- Since Jetpacks are not allowed on this plan, Option 1 and Option 2 will dynamically remove Jetpacks as an option when this plan is selected
- Added the Loyalty Go Unlimited plan
- Added an "other" section for miscellaneous costs
- Added a "tax" option
	- You can find this under the dropdown menu on the "Benefit Sheet" page (the same place "Print", "Delete Benefit Sheet", and "Delete All" are located)

## [2.1.1] - 2020-04-17
### Fixed
- Price correction for HumX on Business Accounts
	- Please logout and log back in to see the changes

## [2.1.0] - 2020-03-11
### Added
- Added a "New Changes!" alert to the sidebar the first time a user logs in after an update
- Added a menu to the top-right of the Benefit Sheet page
	- This dropdown menu allows you to print, delete all, and delete the Benefit Sheet
	- The print option pops up with a screen to be able to add the customer name and phone number, which then ends up on the printed Benefit Sheet

### Changed
- Changed the gizmo pricing
- Changed the wording of the label for the activation fee dropdown to make it more clear about what it does
- Added a "load more" option to the usage in the admin panel
	- Now it shows the current month by default, and adds a month every time you press, "load more"

## [2.0.0] - 2020-03-04
### Added
- Added Business Unlimited Plans
- Added rep name and date when printing
	- This is auto-generated
- Added the military 15% discount to the $30 basic phone plans

### Changed
- Changed the style of the sidebar
	- The new style has more room to add more links, as well as being cleaner and more uniform with the rest of the app
- Re-labeled TMP to include VZ Protect

### Fixed
- Removed the first responder discount from the $110 and $65 Unlimited plans

## [1.6.1] - 2020-02-03
### Added
- Added the required copyright notice to the bottom of the login page

### Changed
- Changed a lot of how I wrote my styling
	- You shouldn't notice a difference, but this will make it easier to maintain and make future changes

## [1.6.0] - 2020-01-29
### Added
- Admins can now see very basic app usage per user
	- This shows a list of times the user has logged in

## [1.5.0] - 2020-01-28
### Added
- Added a Changelog page so people can actually see this!
	- You get to it by clicking the version number on the sidebar

## [1.4.0] - 2020-01-28
### Added
- Admins can now filter users

### Changed
- Due to popular request, I changed TMP to an input (instead of a dropdown)
	- Make sure you do not add a "$" to the beginning of the amount, otherwise it will not calculate properly

### Fixed
- Fixed an issue where a single "Do More" phone was giving a discount on up to 10 jetpacks or tablets

## [1.3.0] - 2020-01-24
### Added
- Admins now have the ability to sort users

## [1.2.0] - 2020-01-24
### Added
- Admins can now edit users
- Added super admin functionality
	- Super admins can edit and delete other admins
	- They can also change users to admins

## [1.1.0] - 2020-01-21
- First widespread release

### Added
- Added an admin panel
	- The admin panel allows admins to add and remove users
- Added the ability for users to reset their password
	- This is done by sending an email to the user with a link for temporary authorization

### Changed
- Changed the login page layout and style

## [1.0.2] - 2019-11-23
### Fixed
- Fixed the issue where DPP wasn't adding in properly.

## [1.0.1] - 2019-11-21
### Fixed
- The autopay discount was not applying when used in Microsoft Edge. This is now fixed.

## [1.0.0] - 2019-11-18
### Added
- New changelog to accompany the 1.0.0 release
	- New changelog structure
- Added currency formatting
- Added trash can functionality to the Benefit Sheet page
- Added url routing

### Changed
- The plan can now be just a $30 single basic phone plan
- Fixed the trash can to be more reliable
- Changed the data to be in a vuex store for better reliability
- Sessions last longer before logging out

### Removed
- Removed the "Line Access" Section of the plan breakdown