// Point class
function Point(x, y) // constructor
{
    this.X = x;
    this.Y = y;
}

// Rectangle class
function Rectangle(x, y, width, height) // constructor
{
    this.X = x;
    this.Y = y;
    this.Width = width;
    this.Height = height;
}

// Unistroke class: a unistroke template
function Unistroke(name, points) // constructor
{
    this.Name = name;
    this.Points = Resample(points, NumPoints);
    var radians = IndicativeAngle(this.Points);
    this.Points = RotateBy(this.Points, -radians);
    this.Points = ScaleTo(this.Points, SquareSize);
    this.Points = TranslateTo(this.Points, Origin);
    this.Vector = Vectorize(this.Points); // for Protractor
}

// Result class
function Result(name, score, ms) // constructor
{
    this.Name = name;
    this.Score = score;
    this.Time = ms;
}

// DollarRecognizer constants
status = null;
NumUnistrokes = 0;
const NumPoints = 64;
const SquareSize = 250.0;
const Origin = new Point(0, 0);
const Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
const HalfDiagonal = 0.5 * Diagonal;
const AngleRange = Deg2Rad(45.0);
const AnglePrecision = Deg2Rad(2.0);
const Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio


// DollarRecognizer class
function DollarRecognizer(status) // constructor
{
    this.status = status;
    if (status == "drawStatus") {
        NumUnistrokes = 4;
        this.Unistrokes = new Array(NumUnistrokes);
        this.Unistrokes[0] = new Unistroke("drawStatus", new Array(new Point(594, 217), new Point(594, 216), new Point(592, 214), new Point(591, 212), new Point(590, 211), new Point(589, 210), new Point(588, 209), new Point(587, 209), new Point(583, 209), new Point(579, 209), new Point(573, 209), new Point(569, 210), new Point(565, 212), new Point(561, 214), new Point(558, 218), new Point(554, 224), new Point(553, 226), new Point(549, 233), new Point(547, 240), new Point(546, 244), new Point(544, 250), new Point(544, 254), new Point(544, 258), new Point(544, 261), new Point(544, 265), new Point(545, 268), new Point(547, 271), new Point(552, 274), new Point(554, 276), new Point(556, 276), new Point(557, 277), new Point(558, 277), new Point(560, 277), new Point(562, 276), new Point(566, 274), new Point(569, 271), new Point(574, 266), new Point(579, 260), new Point(584, 254), new Point(592, 241), new Point(596, 233), new Point(600, 226), new Point(604, 219), new Point(608, 212), new Point(610, 208), new Point(613, 202), new Point(614, 198), new Point(616, 193), new Point(619, 188), new Point(620, 185), new Point(621, 183), new Point(622, 181), new Point(622, 181), new Point(622, 180), new Point(622, 181), new Point(622, 182), new Point(621, 183), new Point(617, 190), new Point(614, 198), new Point(610, 206), new Point(607, 215), new Point(603, 224), new Point(601, 232), new Point(600, 237), new Point(599, 243), new Point(598, 247), new Point(598, 251), new Point(598, 254), new Point(598, 257), new Point(600, 258), new Point(601, 260), new Point(606, 262), new Point(609, 263), new Point(614, 264), new Point(618, 264), new Point(625, 264), new Point(632, 262), new Point(645, 253), new Point(654, 245), new Point(662, 235), new Point(668, 225), new Point(672, 215), new Point(674, 208), new Point(675, 202), new Point(676, 193), new Point(676, 186), new Point(676, 179), new Point(675, 172), new Point(674, 167), new Point(669, 158), new Point(666, 153), new Point(663, 150), new Point(657, 146), new Point(650, 142), new Point(639, 139), new Point(627, 135), new Point(613, 132), new Point(601, 130), new Point(590, 130), new Point(580, 130), new Point(572, 130), new Point(561, 132), new Point(557, 134), new Point(552, 136), new Point(547, 140), new Point(542, 144), new Point(538, 149), new Point(534, 155), new Point(530, 162), new Point(523, 174), new Point(520, 184), new Point(516, 197), new Point(514, 218), new Point(514, 232), new Point(514, 245), new Point(514, 257), new Point(515, 268), new Point(517, 278), new Point(520, 287), new Point(523, 294), new Point(526, 301), new Point(530, 307), new Point(533, 313), new Point(537, 319), new Point(543, 325), new Point(546, 328), new Point(550, 331), new Point(552, 332), new Point(555, 332), new Point(559, 332), new Point(564, 332), new Point(569, 329), new Point(577, 326), new Point(585, 321), new Point(603, 309), new Point(614, 300), new Point(624, 292), new Point(629, 287), new Point(635, 282), new Point(638, 279), new Point(639, 278), new Point(640, 276), new Point(641, 275), new Point(641, 274), new Point(642, 274), new Point(642, 274), new Point(642, 273)));
        this.Unistrokes[1] = new Unistroke("charStatus", new Array(new Point(518, 216), new Point(519, 216), new Point(523, 216), new Point(532, 216), new Point(539, 216), new Point(546, 216), new Point(552, 216), new Point(560, 216), new Point(566, 215), new Point(572, 213), new Point(577, 210), new Point(582, 206), new Point(590, 200), new Point(593, 197), new Point(595, 195), new Point(595, 193), new Point(596, 192), new Point(596, 190), new Point(596, 186), new Point(593, 182), new Point(589, 177), new Point(585, 172), new Point(581, 170), new Point(573, 166), new Point(566, 165), new Point(558, 165), new Point(544, 166), new Point(535, 169), new Point(526, 173), new Point(518, 176), new Point(513, 179), new Point(507, 184), new Point(502, 190), new Point(498, 195), new Point(496, 201), new Point(493, 212), new Point(492, 222), new Point(492, 231), new Point(492, 241), new Point(494, 251), new Point(498, 261), new Point(502, 269), new Point(506, 274), new Point(510, 278), new Point(516, 281), new Point(523, 283), new Point(535, 285), new Point(546, 286), new Point(557, 286), new Point(566, 286), new Point(575, 284), new Point(583, 282), new Point(591, 279), new Point(599, 274), new Point(607, 268), new Point(614, 261), new Point(624, 249), new Point(633, 234), new Point(640, 221), new Point(645, 208), new Point(648, 197), new Point(649, 187), new Point(650, 177), new Point(650, 166), new Point(646, 155), new Point(639, 142), new Point(631, 131), new Point(622, 121), new Point(607, 110), new Point(596, 105), new Point(585, 102), new Point(573, 99), new Point(560, 98), new Point(548, 98), new Point(537, 98), new Point(526, 101), new Point(516, 105), new Point(505, 111), new Point(494, 119), new Point(479, 131), new Point(460, 149), new Point(447, 165), new Point(440, 175), new Point(431, 188), new Point(425, 200), new Point(420, 211), new Point(414, 226), new Point(412, 238), new Point(409, 254), new Point(408, 280), new Point(408, 295), new Point(408, 307), new Point(412, 318), new Point(417, 328), new Point(423, 335), new Point(429, 340), new Point(436, 343), new Point(444, 344), new Point(454, 345), new Point(471, 345), new Point(491, 343), new Point(505, 340), new Point(513, 338), new Point(526, 334), new Point(533, 331), new Point(540, 327), new Point(547, 322), new Point(552, 318), new Point(557, 314), new Point(561, 311), new Point(564, 308), new Point(565, 307), new Point(567, 306), new Point(567, 306)));
        this.Unistrokes[2] = new Unistroke("triangle", new Array(new Point(432, 148), new Point(432, 158), new Point(432, 186), new Point(432, 199), new Point(432, 237), new Point(432, 263), new Point(432, 287), new Point(432, 302), new Point(432, 320), new Point(432, 334), new Point(432, 346), new Point(432, 357), new Point(432, 363), new Point(432, 369), new Point(432, 374), new Point(432, 378), new Point(432, 380), new Point(432, 381), new Point(432, 381), new Point(434, 381), new Point(437, 381), new Point(444, 381), new Point(460, 380), new Point(483, 378), new Point(532, 377), new Point(571, 377), new Point(607, 377), new Point(641, 377), new Point(670, 377), new Point(695, 378), new Point(710, 379), new Point(731, 379), new Point(747, 379), new Point(761, 380), new Point(774, 380), new Point(789, 381), new Point(795, 381), new Point(802, 381), new Point(807, 381), new Point(811, 381), new Point(813, 381), new Point(815, 381), new Point(816, 381), new Point(816, 381), new Point(816, 381), new Point(817, 381), new Point(815, 380), new Point(812, 377), new Point(806, 374), new Point(796, 368), new Point(779, 358), new Point(764, 349), new Point(747, 339), new Point(718, 323), new Point(696, 311), new Point(675, 299), new Point(653, 287), new Point(632, 274), new Point(610, 259), new Point(590, 246), new Point(577, 237), new Point(562, 226), new Point(543, 214), new Point(532, 208), new Point(515, 195), new Point(505, 187), new Point(494, 180), new Point(484, 173), new Point(477, 168), new Point(469, 164), new Point(463, 161), new Point(456, 159), new Point(451, 157), new Point(444, 155), new Point(440, 153), new Point(438, 152), new Point(436, 152), new Point(435, 151), new Point(435, 151), new Point(435, 151), new Point(435, 150)));
        this.Unistrokes[3] = new Unistroke("rectangle", new Array(new Point(78, 149), new Point(78, 153), new Point(78, 157), new Point(78, 160), new Point(79, 162), new Point(79, 164), new Point(79, 167), new Point(79, 169), new Point(79, 173), new Point(79, 178), new Point(79, 183), new Point(80, 189), new Point(80, 193), new Point(80, 198), new Point(80, 202), new Point(81, 208), new Point(81, 210), new Point(81, 216), new Point(82, 222), new Point(82, 224), new Point(82, 227), new Point(83, 229), new Point(83, 231), new Point(85, 230), new Point(88, 232), new Point(90, 233), new Point(92, 232), new Point(94, 233), new Point(99, 232), new Point(102, 233), new Point(106, 233), new Point(109, 234), new Point(117, 235), new Point(123, 236), new Point(126, 236), new Point(135, 237), new Point(142, 238), new Point(145, 238), new Point(152, 238), new Point(154, 239), new Point(165, 238), new Point(174, 237), new Point(179, 236), new Point(186, 235), new Point(191, 235), new Point(195, 233), new Point(197, 233), new Point(200, 233), new Point(201, 235), new Point(201, 233), new Point(199, 231), new Point(198, 226), new Point(198, 220), new Point(196, 207), new Point(195, 195), new Point(195, 181), new Point(195, 173), new Point(195, 163), new Point(194, 155), new Point(192, 145), new Point(192, 143), new Point(192, 138), new Point(191, 135), new Point(191, 133), new Point(191, 130), new Point(190, 128), new Point(188, 129), new Point(186, 129), new Point(181, 132), new Point(173, 131), new Point(162, 131), new Point(151, 132), new Point(149, 132), new Point(138, 132), new Point(136, 132), new Point(122, 131), new Point(120, 131), new Point(109, 130), new Point(107, 130), new Point(90, 132), new Point(81, 133), new Point(76, 133)));
    } else {
        NumUnistrokes = 15;
        this.Unistrokes = new Array(NumUnistrokes);
        this.Unistrokes[0] = new Unistroke("drawStatus", new Array(new Point(429, 181), new Point(428, 180), new Point(426, 180), new Point(423, 179), new Point(420, 177), new Point(418, 177), new Point(414, 177), new Point(411, 178), new Point(407, 183), new Point(405, 187), new Point(403, 190), new Point(400, 205), new Point(400, 207), new Point(405, 218), new Point(411, 219), new Point(414, 219), new Point(418, 216), new Point(420, 214), new Point(427, 201), new Point(434, 186), new Point(438, 174), new Point(443, 166), new Point(444, 162), new Point(446, 158), new Point(453, 141), new Point(456, 136), new Point(456, 134), new Point(457, 133), new Point(456, 133), new Point(454, 133), new Point(451, 139), new Point(449, 145), new Point(446, 151), new Point(443, 159), new Point(441, 164), new Point(438, 174), new Point(436, 181), new Point(434, 191), new Point(434, 196), new Point(434, 203), new Point(434, 208), new Point(434, 212), new Point(435, 215), new Point(437, 218), new Point(438, 219), new Point(440, 220), new Point(441, 220), new Point(442, 220), new Point(444, 219), new Point(448, 218), new Point(451, 213), new Point(455, 208), new Point(459, 201), new Point(464, 194), new Point(468, 186), new Point(472, 178), new Point(474, 169), new Point(474, 159), new Point(474, 147), new Point(472, 139), new Point(467, 131), new Point(460, 124), new Point(452, 118), new Point(443, 113), new Point(433, 112), new Point(422, 113), new Point(410, 117), new Point(404, 120), new Point(395, 126), new Point(389, 133), new Point(384, 141), new Point(380, 151), new Point(371, 176), new Point(368, 188), new Point(368, 192), new Point(366, 220), new Point(367, 231), new Point(373, 254), new Point(380, 264), new Point(385, 270), new Point(392, 273), new Point(402, 273), new Point(415, 266), new Point(420, 261), new Point(444, 237), new Point(449, 229), new Point(450, 225), new Point(450, 220), new Point(450, 219)));
        this.Unistrokes[1] = new Unistroke("charStatus", new Array(new Point(410, 188), new Point(411, 189), new Point(415, 189), new Point(422, 188), new Point(430, 185), new Point(435, 183), new Point(441, 181), new Point(444, 177), new Point(448, 174), new Point(449, 172), new Point(449, 169), new Point(447, 166), new Point(443, 163), new Point(441, 162), new Point(437, 161), new Point(434, 161), new Point(430, 162), new Point(426, 163), new Point(421, 165), new Point(417, 168), new Point(413, 172), new Point(410, 177), new Point(405, 186), new Point(405, 207), new Point(407, 212), new Point(413, 220), new Point(419, 224), new Point(423, 225), new Point(437, 222), new Point(443, 219), new Point(450, 213), new Point(460, 201), new Point(466, 191), new Point(470, 185), new Point(472, 177), new Point(472, 168), new Point(471, 161), new Point(466, 154), new Point(463, 152), new Point(457, 148), new Point(450, 145), new Point(444, 142), new Point(438, 140), new Point(433, 140), new Point(427, 140), new Point(419, 142), new Point(408, 148), new Point(401, 154), new Point(392, 165), new Point(388, 173), new Point(384, 185), new Point(383, 196), new Point(382, 207), new Point(382, 219), new Point(383, 230), new Point(385, 240), new Point(389, 249), new Point(393, 255), new Point(399, 261), new Point(406, 264), new Point(412, 264), new Point(419, 261), new Point(428, 255), new Point(435, 251), new Point(438, 246), new Point(443, 242), new Point(445, 238), new Point(448, 236), new Point(449, 232), new Point(449, 232)));
        this.Unistrokes[2] = new Unistroke("=", new Array(new Point(346, 121), new Point(347, 121), new Point(352, 121), new Point(356, 120), new Point(362, 118), new Point(382, 115), new Point(394, 114), new Point(406, 113), new Point(425, 112), new Point(438, 112), new Point(442, 113), new Point(445, 113), new Point(448, 113), new Point(446, 113), new Point(334, 172), new Point(335, 172), new Point(339, 172), new Point(345, 171), new Point(355, 169), new Point(369, 166), new Point(387, 163), new Point(404, 162), new Point(421, 160), new Point(436, 160), new Point(446, 160), new Point(452, 160), new Point(455, 160), new Point(456, 160), new Point(456, 160), new Point(456, 160), new Point(456, 160)));
        this.Unistrokes[3] = new Unistroke("miu", new Array(new Point(341, 244), new Point(340, 245), new Point(341, 245), new Point(343, 243), new Point(345, 238), new Point(348, 229), new Point(353, 218), new Point(358, 205), new Point(362, 194), new Point(367, 183), new Point(370, 174), new Point(372, 167), new Point(374, 160), new Point(374, 155), new Point(374, 153), new Point(374, 152), new Point(374, 152), new Point(373, 153), new Point(371, 157), new Point(369, 161), new Point(367, 173), new Point(366, 185), new Point(366, 196), new Point(367, 205), new Point(368, 210), new Point(372, 215), new Point(375, 216), new Point(379, 215), new Point(383, 210), new Point(388, 201), new Point(392, 189), new Point(397, 180), new Point(399, 173), new Point(402, 166), new Point(404, 157), new Point(405, 151), new Point(406, 148), new Point(406, 147), new Point(406, 148), new Point(404, 151), new Point(401, 157), new Point(399, 166), new Point(398, 175), new Point(397, 190), new Point(396, 203), new Point(398, 211), new Point(404, 216), new Point(411, 216), new Point(418, 212), new Point(425, 206), new Point(430, 200), new Point(432, 197), new Point(434, 195)));
        this.Unistrokes[4] = new Unistroke("xita", new Array(new Point(360, 133), new Point(359, 134), new Point(357, 137), new Point(354, 140), new Point(353, 145), new Point(352, 151), new Point(351, 160), new Point(350, 172), new Point(350, 185), new Point(352, 195), new Point(355, 201), new Point(360, 204), new Point(365, 204), new Point(370, 199), new Point(377, 188), new Point(383, 175), new Point(388, 163), new Point(391, 153), new Point(393, 142), new Point(392, 131), new Point(390, 121), new Point(388, 117), new Point(383, 113), new Point(378, 113), new Point(370, 115), new Point(364, 119), new Point(360, 126), new Point(357, 133), new Point(354, 145), new Point(353, 153), new Point(355, 158), new Point(359, 161), new Point(370, 162), new Point(380, 163), new Point(388, 161), new Point(396, 159), new Point(397, 158)));
        this.Unistrokes[5] = new Unistroke("0.1", new Array(new Point(340, 171), new Point(338, 171), new Point(337, 172), new Point(336, 174), new Point(335, 177), new Point(333, 181), new Point(332, 187), new Point(332, 194), new Point(332, 201), new Point(334, 208), new Point(337, 214), new Point(342, 218), new Point(346, 220), new Point(352, 221), new Point(360, 219), new Point(366, 214), new Point(372, 209), new Point(376, 203), new Point(380, 195), new Point(381, 188), new Point(382, 180), new Point(381, 174), new Point(376, 161), new Point(373, 155), new Point(367, 151), new Point(361, 151), new Point(355, 154), new Point(354, 155), new Point(345, 164), new Point(343, 169), new Point(342, 173), new Point(342, 174), new Point(342, 174), new Point(343, 177), new Point(392, 212), new Point(395, 212), new Point(397, 212), new Point(399, 212), new Point(400, 212), new Point(445, 136), new Point(445, 135), new Point(445, 135), new Point(445, 139), new Point(445, 148), new Point(444, 161), new Point(443, 179), new Point(442, 199), new Point(442, 208), new Point(443, 216), new Point(443, 221), new Point(443, 224), new Point(443, 225), new Point(443, 226), new Point(442, 226), new Point(442, 226)));
        this.Unistrokes[6] = new Unistroke("0.2", new Array(new Point(327, 159), new Point(327, 160), new Point(323, 164), new Point(322, 169), new Point(320, 175), new Point(319, 183), new Point(319, 193), new Point(320, 203), new Point(322, 212), new Point(327, 219), new Point(333, 222), new Point(340, 223), new Point(346, 219), new Point(352, 211), new Point(355, 202), new Point(359, 192), new Point(360, 182), new Point(360, 172), new Point(358, 163), new Point(354, 155), new Point(351, 151), new Point(346, 150), new Point(343, 151), new Point(339, 154), new Point(336, 159), new Point(333, 163), new Point(333, 164), new Point(368, 199), new Point(370, 201), new Point(371, 202), new Point(378, 208), new Point(380, 208), new Point(380, 209), new Point(395, 151), new Point(398, 150), new Point(403, 150), new Point(411, 153), new Point(416, 159), new Point(420, 167), new Point(420, 179), new Point(414, 192), new Point(405, 205), new Point(397, 213), new Point(392, 216), new Point(391, 217), new Point(392, 216), new Point(405, 212), new Point(420, 205), new Point(433, 203), new Point(442, 203), new Point(448, 203), new Point(451, 203), new Point(451, 203), new Point(451, 203), new Point(449, 203), new Point(448, 203)));
        this.Unistrokes[7] = new Unistroke("0.3", new Array(new Point(329, 144), new Point(328, 144), new Point(325, 145), new Point(323, 146), new Point(321, 153), new Point(319, 160), new Point(316, 172), new Point(315, 186), new Point(317, 196), new Point(323, 201), new Point(329, 202), new Point(338, 197), new Point(346, 187), new Point(352, 174), new Point(355, 163), new Point(357, 152), new Point(355, 142), new Point(352, 136), new Point(347, 132), new Point(343, 131), new Point(337, 135), new Point(333, 140), new Point(331, 144), new Point(330, 149), new Point(367, 186), new Point(370, 191), new Point(372, 192), new Point(379, 196), new Point(380, 196), new Point(379, 196), new Point(398, 118), new Point(398, 117), new Point(404, 116), new Point(408, 117), new Point(413, 121), new Point(414, 126), new Point(414, 133), new Point(411, 139), new Point(405, 145), new Point(400, 148), new Point(396, 148), new Point(392, 149), new Point(393, 149), new Point(398, 148), new Point(404, 146), new Point(417, 146), new Point(427, 147), new Point(434, 151), new Point(437, 155), new Point(438, 161), new Point(437, 168), new Point(433, 175), new Point(426, 185), new Point(420, 189), new Point(413, 194), new Point(407, 197), new Point(404, 198), new Point(401, 199), new Point(401, 199), new Point(403, 200)));
        this.Unistrokes[8] = new Unistroke("0.4", new Array(new Point(305, 170), new Point(303, 169), new Point(301, 170), new Point(300, 172), new Point(298, 176), new Point(296, 185), new Point(296, 195), new Point(298, 204), new Point(304, 214), new Point(310, 217), new Point(317, 216), new Point(322, 212), new Point(328, 204), new Point(331, 195), new Point(334, 183), new Point(334, 172), new Point(333, 164), new Point(331, 161), new Point(327, 160), new Point(321, 161), new Point(314, 164), new Point(308, 168), new Point(305, 174), new Point(305, 177), new Point(306, 179), new Point(352, 202), new Point(354, 203), new Point(357, 204), new Point(360, 206), new Point(361, 207), new Point(363, 207), new Point(363, 208), new Point(398, 141), new Point(399, 139), new Point(399, 139), new Point(397, 141), new Point(384, 157), new Point(378, 166), new Point(374, 171), new Point(370, 183), new Point(375, 185), new Point(385, 186), new Point(397, 184), new Point(410, 181), new Point(423, 179), new Point(430, 177), new Point(434, 177), new Point(436, 176), new Point(436, 176), new Point(435, 175), new Point(435, 175), new Point(414, 133), new Point(413, 135), new Point(413, 139), new Point(412, 153), new Point(412, 163), new Point(412, 183), new Point(413, 195), new Point(413, 212), new Point(413, 221), new Point(413, 232), new Point(413, 237), new Point(413, 238), new Point(413, 239), new Point(413, 238), new Point(413, 237), new Point(413, 235)));
        this.Unistrokes[9] = new Unistroke("0.5", new Array(new Point(340, 158), new Point(338, 158), new Point(335, 161), new Point(332, 166), new Point(329, 175), new Point(327, 188), new Point(326, 195), new Point(327, 213), new Point(336, 225), new Point(345, 225), new Point(353, 216), new Point(355, 213), new Point(361, 197), new Point(364, 179), new Point(363, 162), new Point(360, 155), new Point(359, 154), new Point(352, 154), new Point(347, 154), new Point(344, 155), new Point(337, 167), new Point(375, 205), new Point(375, 206), new Point(377, 207), new Point(380, 207), new Point(382, 208), new Point(383, 209), new Point(383, 210), new Point(412, 132), new Point(411, 132), new Point(410, 135), new Point(408, 141), new Point(406, 148), new Point(406, 154), new Point(406, 162), new Point(410, 169), new Point(413, 174), new Point(419, 177), new Point(425, 180), new Point(428, 184), new Point(431, 189), new Point(434, 194), new Point(434, 198), new Point(434, 204), new Point(433, 207), new Point(429, 212), new Point(426, 217), new Point(422, 219), new Point(408, 221), new Point(406, 218), new Point(415, 145), new Point(414, 145), new Point(414, 144), new Point(418, 143), new Point(426, 142), new Point(437, 140), new Point(449, 138), new Point(458, 136), new Point(465, 135), new Point(468, 135), new Point(469, 135), new Point(469, 135), new Point(468, 135), new Point(468, 135)));
        this.Unistrokes[10] = new Unistroke("0.6", new Array(new Point(330, 135), new Point(329, 135), new Point(322, 137), new Point(317, 145), new Point(314, 153), new Point(312, 158), new Point(310, 163), new Point(309, 183), new Point(314, 194), new Point(318, 198), new Point(322, 201), new Point(328, 203), new Point(334, 202), new Point(342, 195), new Point(348, 186), new Point(354, 175), new Point(358, 166), new Point(360, 159), new Point(359, 151), new Point(356, 141), new Point(351, 132), new Point(346, 127), new Point(342, 126), new Point(338, 126), new Point(333, 129), new Point(329, 131), new Point(327, 133), new Point(325, 136), new Point(325, 139), new Point(325, 142), new Point(378, 187), new Point(382, 188), new Point(384, 188), new Point(386, 189), new Point(387, 189), new Point(388, 189), new Point(431, 83), new Point(430, 87), new Point(429, 89), new Point(428, 94), new Point(425, 109), new Point(421, 133), new Point(420, 142), new Point(413, 179), new Point(413, 188), new Point(415, 196), new Point(418, 204), new Point(422, 210), new Point(427, 213), new Point(431, 214), new Point(437, 212), new Point(444, 208), new Point(450, 202), new Point(455, 195), new Point(458, 186), new Point(460, 177), new Point(460, 170), new Point(457, 162), new Point(451, 154), new Point(443, 150), new Point(436, 149), new Point(429, 151), new Point(421, 155), new Point(416, 160), new Point(413, 164), new Point(412, 167), new Point(412, 169)));
        this.Unistrokes[11] = new Unistroke("0.7", new Array(new Point(322, 151), new Point(322, 151), new Point(320, 151), new Point(318, 154), new Point(316, 157), new Point(315, 163), new Point(313, 171), new Point(312, 179), new Point(312, 189), new Point(312, 197), new Point(313, 204), new Point(317, 213), new Point(322, 218), new Point(329, 220), new Point(337, 219), new Point(345, 216), new Point(355, 209), new Point(364, 199), new Point(372, 188), new Point(377, 177), new Point(379, 168), new Point(378, 157), new Point(374, 147), new Point(367, 136), new Point(360, 129), new Point(354, 127), new Point(347, 130), new Point(344, 133), new Point(338, 139), new Point(335, 144), new Point(333, 148), new Point(332, 151), new Point(397, 204), new Point(398, 205), new Point(401, 207), new Point(403, 208), new Point(405, 209), new Point(406, 209), new Point(406, 209), new Point(406, 209), new Point(428, 91), new Point(429, 91), new Point(433, 93), new Point(440, 96), new Point(448, 98), new Point(456, 99), new Point(465, 100), new Point(472, 100), new Point(476, 103), new Point(479, 105), new Point(481, 109), new Point(481, 114), new Point(480, 122), new Point(478, 133), new Point(474, 148), new Point(472, 160), new Point(470, 180), new Point(470, 194), new Point(470, 206), new Point(470, 219), new Point(470, 230), new Point(470, 242), new Point(470, 249), new Point(469, 254), new Point(468, 255), new Point(468, 256), new Point(468, 256), new Point(468, 256), new Point(468, 255), new Point(468, 254)));
        this.Unistrokes[12] = new Unistroke("0.8", new Array(new Point(322, 160), new Point(321, 161), new Point(318, 166), new Point(316, 170), new Point(315, 179), new Point(313, 189), new Point(313, 200), new Point(315, 210), new Point(319, 216), new Point(324, 219), new Point(331, 219), new Point(336, 218), new Point(345, 210), new Point(351, 201), new Point(355, 189), new Point(358, 181), new Point(358, 169), new Point(354, 160), new Point(349, 153), new Point(344, 148), new Point(338, 146), new Point(333, 148), new Point(328, 151), new Point(325, 155), new Point(323, 162), new Point(323, 164), new Point(380, 204), new Point(382, 205), new Point(385, 206), new Point(388, 206), new Point(389, 205), new Point(390, 205), new Point(463, 116), new Point(453, 112), new Point(445, 112), new Point(433, 119), new Point(429, 123), new Point(426, 129), new Point(426, 130), new Point(425, 148), new Point(427, 151), new Point(433, 159), new Point(439, 164), new Point(446, 171), new Point(454, 177), new Point(461, 184), new Point(467, 190), new Point(473, 196), new Point(475, 201), new Point(479, 208), new Point(480, 214), new Point(480, 219), new Point(480, 222), new Point(474, 228), new Point(470, 232), new Point(463, 237), new Point(457, 239), new Point(445, 240), new Point(438, 237), new Point(434, 232), new Point(432, 228), new Point(431, 219), new Point(432, 212), new Point(435, 205), new Point(436, 202), new Point(445, 191), new Point(452, 183), new Point(459, 175), new Point(465, 169), new Point(468, 163), new Point(472, 157), new Point(474, 150), new Point(475, 146), new Point(475, 141), new Point(475, 136), new Point(474, 132), new Point(473, 130), new Point(471, 127), new Point(469, 126), new Point(466, 124), new Point(464, 122), new Point(462, 121), new Point(460, 121), new Point(459, 120), new Point(458, 120)));
        this.Unistrokes[13] = new Unistroke("0.9", new Array(new Point(332, 155), new Point(329, 157), new Point(327, 159), new Point(323, 165), new Point(321, 171), new Point(319, 178), new Point(318, 187), new Point(317, 195), new Point(317, 203), new Point(318, 208), new Point(323, 221), new Point(329, 227), new Point(332, 228), new Point(339, 228), new Point(344, 227), new Point(367, 204), new Point(377, 184), new Point(378, 150), new Point(376, 142), new Point(362, 125), new Point(354, 125), new Point(346, 129), new Point(340, 134), new Point(336, 141), new Point(333, 148), new Point(332, 155), new Point(332, 161), new Point(404, 204), new Point(407, 205), new Point(410, 208), new Point(412, 210), new Point(413, 211), new Point(414, 212), new Point(488, 128), new Point(488, 122), new Point(488, 115), new Point(486, 109), new Point(484, 104), new Point(481, 98), new Point(476, 95), new Point(475, 94), new Point(469, 92), new Point(460, 93), new Point(455, 98), new Point(449, 107), new Point(443, 115), new Point(437, 131), new Point(436, 137), new Point(435, 152), new Point(436, 157), new Point(441, 161), new Point(446, 160), new Point(467, 142), new Point(472, 139), new Point(478, 133), new Point(481, 130), new Point(485, 127), new Point(488, 126), new Point(489, 125), new Point(489, 125), new Point(489, 127), new Point(488, 131), new Point(484, 138), new Point(480, 148), new Point(474, 162), new Point(469, 177), new Point(464, 193), new Point(459, 208), new Point(457, 221), new Point(456, 234), new Point(455, 245), new Point(455, 253), new Point(455, 260), new Point(455, 265), new Point(454, 270), new Point(454, 273), new Point(454, 275), new Point(453, 275), new Point(453, 275), new Point(453, 275), new Point(453, 274)));
        this.Unistrokes[14] = new Unistroke("gou", new Array(new Point(536, 413), new Point(540, 416), new Point(544, 420), new Point(550, 424), new Point(556, 429), new Point(560, 435), new Point(566, 442), new Point(569, 446), new Point(574, 451), new Point(577, 455), new Point(579, 458), new Point(580, 459), new Point(581, 459), new Point(581, 459), new Point(581, 459), new Point(582, 459), new Point(582, 459), new Point(583, 458), new Point(586, 455), new Point(590, 449), new Point(597, 441), new Point(609, 427), new Point(619, 417), new Point(631, 405), new Point(643, 393), new Point(655, 383), new Point(665, 373), new Point(670, 368), new Point(676, 362), new Point(679, 358), new Point(681, 356), new Point(682, 356), new Point(682, 355), new Point(682, 355), new Point(682, 355), new Point(683, 355), new Point(683, 355), new Point(683, 354)));
    }


    // The $1 Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
    this.Recognize = function (points, useProtractor) {
        var t0 = Date.now();
        var candidate = new Unistroke("", points);

        var u = -1;
        var b = +Infinity;
        for (var i = 0; i < this.Unistrokes.length; i++) // for each unistroke template
        {
            var d;
            if (useProtractor)
                d = OptimalCosineDistance(this.Unistrokes[i].Vector, candidate.Vector); // Protractor
            else
                d = DistanceAtBestAngle(candidate.Points, this.Unistrokes[i], -AngleRange, +AngleRange, AnglePrecision); // Golden Section Search (original $1)
            if (d < b) {
                b = d; // best (least) distance
                u = i; // unistroke index
            }
        }
        var t1 = Date.now();
        return (u == -1) ? new Result("No match.", 0.0, t1 - t0) : new Result(this.Unistrokes[u].Name, useProtractor ? (1.0 - b) : (1.0 - b / HalfDiagonal), t1 - t0);
    }
    this.AddGesture = function (name, points) {
        this.Unistrokes[this.Unistrokes.length] = new Unistroke(name, points); // append new unistroke
        var num = 0;
        for (var i = 0; i < this.Unistrokes.length; i++) {
            if (this.Unistrokes[i].Name == name)
                num++;
        }
        return num;
    }
    this.DeleteUserGestures = function () {
        this.Unistrokes.length = NumUnistrokes; // clear any beyond the original set
        return NumUnistrokes;
    }
}

// Private helper functions from here on down
function Resample(points, n) {
    var I = PathLength(points) / (n - 1); // interval length
    var D = 0.0;
    var newpoints = new Array(points[0]);
    for (var i = 1; i < points.length; i++) {
        var d = Distance(points[i - 1], points[i]);
        if ((D + d) >= I) {
            var qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
            var qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
            var q = new Point(qx, qy);
            newpoints[newpoints.length] = q; // append new point 'q'
            points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
            D = 0.0;
        }
        else D += d;
    }
    if (newpoints.length == n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
        newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
    return newpoints;
}
function IndicativeAngle(points) {
    var c = Centroid(points);
    return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
}
function RotateBy(points, radians) // rotates points around centroid
{
    var c = Centroid(points);
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) {
        var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X
        var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
        newpoints[newpoints.length] = new Point(qx, qy);
    }
    return newpoints;
}
function ScaleTo(points, size) // non-uniform scale; assumes 2D gestures (i.e., no lines)
{
    var B = BoundingBox(points);
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) {
        var qx = points[i].X * (size / B.Width);
        var qy = points[i].Y * (size / B.Height);
        newpoints[newpoints.length] = new Point(qx, qy);
    }
    return newpoints;
}
function TranslateTo(points, pt) // translates points' centroid
{
    var c = Centroid(points);
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) {
        var qx = points[i].X + pt.X - c.X;
        var qy = points[i].Y + pt.Y - c.Y;
        newpoints[newpoints.length] = new Point(qx, qy);
    }
    return newpoints;
}
function Vectorize(points) // for Protractor
{
    var sum = 0.0;
    var vector = new Array();
    for (var i = 0; i < points.length; i++) {
        vector[vector.length] = points[i].X;
        vector[vector.length] = points[i].Y;
        sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
    }
    var magnitude = Math.sqrt(sum);
    for (var i = 0; i < vector.length; i++)
        vector[i] /= magnitude;
    return vector;
}
function OptimalCosineDistance(v1, v2) // for Protractor
{
    var a = 0.0;
    var b = 0.0;
    for (var i = 0; i < v1.length; i += 2) {
        a += v1[i] * v2[i] + v1[i + 1] * v2[i + 1];
        b += v1[i] * v2[i + 1] - v1[i + 1] * v2[i];
    }
    var angle = Math.atan(b / a);
    return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
}
function DistanceAtBestAngle(points, T, a, b, threshold) {
    var x1 = Phi * a + (1.0 - Phi) * b;
    var f1 = DistanceAtAngle(points, T, x1);
    var x2 = (1.0 - Phi) * a + Phi * b;
    var f2 = DistanceAtAngle(points, T, x2);
    while (Math.abs(b - a) > threshold) {
        if (f1 < f2) {
            b = x2;
            x2 = x1;
            f2 = f1;
            x1 = Phi * a + (1.0 - Phi) * b;
            f1 = DistanceAtAngle(points, T, x1);
        } else {
            a = x1;
            x1 = x2;
            f1 = f2;
            x2 = (1.0 - Phi) * a + Phi * b;
            f2 = DistanceAtAngle(points, T, x2);
        }
    }
    return Math.min(f1, f2);
}
function DistanceAtAngle(points, T, radians) {
    var newpoints = RotateBy(points, radians);
    return PathDistance(newpoints, T.Points);
}
function Centroid(points) {
    var x = 0.0, y = 0.0;
    for (var i = 0; i < points.length; i++) {
        x += points[i].X;
        y += points[i].Y;
    }
    x /= points.length;
    y /= points.length;
    return new Point(x, y);
}
function BoundingBox(points) {
    var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
    for (var i = 0; i < points.length; i++) {
        minX = Math.min(minX, points[i].X);
        minY = Math.min(minY, points[i].Y);
        maxX = Math.max(maxX, points[i].X);
        maxY = Math.max(maxY, points[i].Y);
    }
    return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}
function PathDistance(pts1, pts2) {
    var d = 0.0;
    for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
        d += Distance(pts1[i], pts2[i]);
    return d / pts1.length;
}
function PathLength(points) {
    var d = 0.0;
    for (var i = 1; i < points.length; i++)
        d += Distance(points[i - 1], points[i]);
    return d;
}
function Distance(p1, p2) {
    var dx = p2.X - p1.X;
    var dy = p2.Y - p1.Y;
    return Math.sqrt(dx * dx + dy * dy);
}
function Deg2Rad(d) { return (d * Math.PI / 180.0); }